import { AuctionLiquidPool } from "../entities/AuctionLiquidPool/AuctionLiquidPool";
import { MappingToken } from "../entities/AuctionLiquidPoolManager/MappingToken";
import { PoolCreated } from "../entities/AuctionLiquidPoolManager/AuctionLiquidPoolManager";
import { Pool, TokenList } from "../entities/schema";
import { prepareAccount } from "./account";

export function handleCreate(event: PoolCreated): void {
  prepareAccount(event.params.owner_);

  let pool = new Pool(event.params.pool_.toHexString());
  pool.owner = event.params.owner_.toHexString();
  pool.is721 = event.params.is721_;

  let poolContract = AuctionLiquidPool.bind(event.params.pool_);
  let tokenContract = MappingToken.bind(poolContract.mappingToken());

  let mappingTokenAddress = poolContract.mappingToken().toHexString();
  let token = TokenList.load(mappingTokenAddress);
  if (token == null) {
    token = new TokenList(mappingTokenAddress);
    token.save();
  }

  pool.name = tokenContract.name();
  pool.logo = poolContract.logo();
  pool.address = event.params.pool_.toHexString();
  pool.mappingToken = mappingTokenAddress;
  pool.nft = poolContract.nft().toHexString();
  pool.tokenIds = poolContract.getTokenIds();
  pool.freeTokenIds = poolContract.getTokenIds();
  pool.createdDate = poolContract.createdAt();
  pool.lockPeriod = poolContract.lockPeriod();
  pool.duration = poolContract.duration();
  pool.isLinear = poolContract.isLinear();
  pool.delta = poolContract.delta();
  pool.ratio = poolContract.ratio();
  pool.randomFee = poolContract.randomFee();
  pool.tradingFee = poolContract.tradingFee();
  pool.startPrice = poolContract.startPrice();
  pool.feeTypes = poolContract.getFeeTypes();
  pool.feeValues = poolContract.getFeeValues();
  pool.save();
}
