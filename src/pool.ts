import { BigInt } from "@graphprotocol/graph-ts";
import {
  Redeemed,
  Swaped,
  AuctionStarted,
  AuctionEnded,
  BidPlaced,
  NFTsLocked,
} from "../entities/AuctionLiquidPool/AuctionLiquidPool";
import { Global, Auction, Bid, Pool, Redeem, Swap } from "../entities/schema";
import { prepareAccount } from "./account";

export function handleLockNFTs(event: NFTsLocked): void {
  let pool = Pool.load(event.address.toHexString());
  if (pool == null) return;

  let tokenIds = pool.tokenIds;
  let freeTokenIds = pool.freeTokenIds;
  for (let i = 0; i < event.params.tokenIds.length; i++) {
    let tokenId = event.params.tokenIds[i];
    tokenIds.push(tokenId);
    freeTokenIds.push(tokenId);
  }
  pool.tokenIds = tokenIds;
  pool.freeTokenIds = freeTokenIds;
  pool.save();
}

export function handleRedeem(event: Redeemed): void {
  prepareAccount(event.params.account);

  let redeemKey = `Redeem::${event.address.toHexString()}::${event.params.account.toHexString()}`;
  let redeemCount = Global.load(redeemKey);
  if (redeemCount == null) {
    redeemCount = new Global(redeemKey);
    redeemCount.value = BigInt.fromI32(0);
  }
  redeemCount.value = redeemCount.value.plus(BigInt.fromI32(1));

  let redeem = new Redeem(`${redeemKey}::${redeemCount.value}`);
  redeem.pool = event.address.toHexString();
  redeem.account = event.params.account.toHexString();
  redeem.tokenIds = event.params.tokenIds;
  redeem.save();
  redeemCount.save();

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

export function handleSwap(event: Swaped): void {
  prepareAccount(event.params.account);

  let swapKey = `Swap::${event.address.toHexString()}::${event.params.account.toHexString()}`;
  let swapCount = Global.load(swapKey);
  if (swapCount == null) {
    swapCount = new Global(swapKey);
    swapCount.value = BigInt.fromI32(0);
  }
  swapCount.value = swapCount.value.plus(BigInt.fromI32(1));

  let swap = new Swap(`${swapKey}::${swapCount.value}`);
  swap.pool = event.address.toHexString();
  swap.account = event.params.account.toHexString();
  swap.inTokenId = event.params.srcTokenId;
  swap.outTokenId = event.params.dstTokenId;
  swap.save();

  let pool = Pool.load(swap.pool)!;
  if (pool == null) return;

  let tokenIds = pool.tokenIds;
  tokenIds.splice(tokenIds.indexOf(swap.outTokenId), 1);
  pool.tokenIds = tokenIds;
  let freeTokenIds = pool.freeTokenIds;
  freeTokenIds.splice(freeTokenIds.indexOf(swap.outTokenId), 1);
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
  );
  if (!auction) return;
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
