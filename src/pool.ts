import { BigInt, log } from "@graphprotocol/graph-ts";
import {
  RedeemRequested,
  Redeemed,
  SwapRequested,
  Swaped,
  AuctionStarted,
  AuctionEnded,
  BidPlaced,
} from "../entities/AuctionLiquidPool/AuctionLiquidPool";
import { Auction, Bid, Pool, Redeem, Swap } from "../entities/schema";
import { prepareAccount } from "./account";

export function handleRedeemRequest(event: RedeemRequested): void {
  prepareAccount(event.params.account);
  log.warning(">>>> pool info {} {}", [
    event.address.toHexString(),
    event.params.requestId.toString(),
  ]);
  let redeem = new Redeem(event.params.requestId.toString());
  redeem.pool = event.address.toHexString();
  redeem.account = event.params.account.toHexString();
  redeem.save();
}

export function handleRedeem(event: Redeemed): void {
  let redeem = Redeem.load(event.params.requestId.toString())!;
  redeem.tokenIds = event.params.tokenIds;
  redeem.save();

  let pool = Pool.load(redeem.pool);
  if (pool == null) return;

  let tokenIds = pool.tokenIds;
  let freeTokenIds = pool.freeTokenIds;
  for (let i = 0; i < event.params.tokenIds.length; i++) {
    let tokenId = event.params.tokenIds[i];
    tokenIds.splice(tokenIds.indexOf(tokenId), 1);
    freeTokenIds.splice(freeTokenIds.indexOf(tokenId), 1);
  }
  pool.tokenIds = tokenIds;
  pool.freeTokenIds = freeTokenIds;
  pool.save();
}

export function handleSwapRequest(event: SwapRequested): void {
  prepareAccount(event.params.account);
  let swap = new Swap(event.params.requestId.toString());
  swap.pool = event.address.toHexString();
  swap.account = event.params.account.toHexString();
  swap.inTokenId = event.params.tokenId;
  swap.save();
}

export function handleSwap(event: Swaped): void {
  let swap = Swap.load(event.params.requestId.toString())!;
  swap.outTokenId = event.params.tokenId;
  swap.save();

  let pool = Pool.load(swap.pool)!;
  if (pool == null) return;

  let tokenIds = pool.tokenIds;
  tokenIds.splice(tokenIds.indexOf(event.params.tokenId), 1);
  pool.tokenIds = tokenIds;
  let freeTokenIds = pool.freeTokenIds;
  freeTokenIds.splice(freeTokenIds.indexOf(event.params.tokenId), 1);
  pool.freeTokenIds = freeTokenIds;
  pool.tokenIds.push(swap.inTokenId);
  pool.freeTokenIds.push(swap.inTokenId);
  pool.save();
}

export function handleAuctionStart(event: AuctionStarted): void {
  prepareAccount(event.params.starter);
  let pool = Pool.load(event.address.toHexString())!;
  let auction = new Auction(
    `${event.address.toHexString()}::${event.params.tokenId}`
  );
  auction.pool = event.address.toHexString();
  auction.tokenId = event.params.tokenId;
  auction.starter = event.params.starter.toHexString();
  auction.startAt = event.block.timestamp;
  auction.expireAt = event.block.timestamp.plus(pool.duration);
  auction.isEnded = false;
  auction.save();

  let freeTokenIds = pool.freeTokenIds;
  freeTokenIds.splice(freeTokenIds.indexOf(event.params.tokenId), 1);
  pool.freeTokenIds = freeTokenIds;
  pool.save();
}

export function handleBid(event: BidPlaced): void {
  prepareAccount(event.params.bidder);
  let bidId = `${event.address.toHexString()}::${event.params.bidder.toHexString()}::${
    event.params.tokenId
  }`;
  let bid = new Bid(bidId);
  bid.auction = `${event.address.toHexString()}::${event.params.tokenId}`;
  bid.account = event.params.bidder.toHexString();
  bid.amount = event.params.amount;
  bid.save();

  let auction = Auction.load(
    `${event.address.toHexString()}::${event.params.tokenId}`
  )!;
  if (!auction.highestBid) auction.highestBid = bidId;
  else {
    let highestBid = Bid.load(auction.highestBid!)!;
    if (bid.amount.gt(highestBid.amount)) auction.highestBid = bidId;
  }
  auction.save();
}

export function handleAuctionEnd(event: AuctionEnded): void {
  let auction = Auction.load(
    `${event.address.toHexString()}::${event.params.tokenId}`
  )!;
  auction.startAt = BigInt.fromI32(0);
  auction.isEnded = true;
  auction.save();

  let pool = Pool.load(event.address.toHexString())!;
  let tokenIds = pool.tokenIds;
  tokenIds.splice(tokenIds.indexOf(event.params.tokenId), 1);
  pool.tokenIds = tokenIds;
  pool.save();
}
