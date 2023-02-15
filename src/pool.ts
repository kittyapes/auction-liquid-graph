import {
  RedeemRequested,
  Redeemed,
  SwapRequested,
  Swaped,
  AuctionStarted,
  AuctionEnded,
  BidPlaced,
} from "../entities/AuctionLiquidPool/AuctionLiquidPool";
import { Auction, Bid, Redeem, Swap } from "../entities/schema";
import { prepareAccount } from "./account";

export function handleRedeemRequest(event: RedeemRequested): void {
  prepareAccount(event.params.account);
  let redeem = new Redeem(event.params.requestId.toString());
  redeem.pool = event.address.toHexString();
  redeem.account = event.params.account.toHexString();
  redeem.save();
}

export function handleRedeem(event: Redeemed): void {
  let redeem = new Redeem(event.params.requestId.toString());
  redeem.tokenIds = event.params.tokenIds;
  redeem.save();
}

export function handleSwapRequest(event: SwapRequested): void {
  prepareAccount(event.params.account);
  let swap = new Swap(event.params.requestId.toString());
  swap.pool = event.address.toHexString();
  swap.account = event.params.account.toHexString();
  swap.outTokenId = event.params.tokenId;
  swap.save();
}

export function handleSwap(event: Swaped): void {
  let swap = new Swap(event.params.requestId.toString());
  swap.inTokenId = event.params.tokenId;
  swap.save();
}

export function handleAuctionStart(event: AuctionStarted): void {
  prepareAccount(event.params.starter);
  let auction = new Auction(
    `${event.address.toHexString()}::${event.params.tokenId}`
  );
  auction.pool = event.address.toHexString();
  auction.tokenId = event.params.tokenId;
  auction.starter = event.params.starter.toHexString();
  auction.save();
}

export function handleBid(event: BidPlaced): void {
  prepareAccount(event.params.bidder);
  let bid = new Bid(
    `${event.address.toHexString()}::${event.params.bidder.toHexString()}::${
      event.params.tokenId
    }`
  );
  bid.auction = `${event.address.toHexString()}::${event.params.tokenId}`;
  bid.account = event.params.bidder.toHexString();
  bid.amount = event.params.amount;
  bid.save();
}

export function handleAuctionEnd(event: AuctionEnded): void {
  let auction = new Auction(
    `${event.address.toHexString()}::${event.params.tokenId}`
  );
  auction.save();
}
