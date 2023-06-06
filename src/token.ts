import { Address, log } from "@graphprotocol/graph-ts";
import {
  MappingToken,
  Transfer,
} from "../entities/templates/MappingToken/MappingToken";
import { TokenList, Snapshot } from "../entities/schema";
import { prepareAccount } from "./account";

export function handleTransfer(event: Transfer): void {
  let tokenAddress = event.address.toHexString();
  let token = TokenList.load(tokenAddress);
  if (token == null) {
    log.warning("{} is not mapping token from D3X", [tokenAddress]);
    return;
  }

  let mappingToken = MappingToken.bind(event.address);
  let timestamp = event.block.timestamp;

  if (!isZeroAddress(event.params.from)) {
    let snapshot = new Snapshot(
      `${tokenAddress}::${event.params.from.toHexString()}::${timestamp.toString()}`
    );
    prepareAccount(event.params.from);
    snapshot.account = event.params.from.toHexString();
    snapshot.balance = mappingToken.balanceOf(event.params.from);
    snapshot.timestamp = timestamp;
    snapshot.save();
  }
  if (!isZeroAddress(event.params.to)) {
    let snapshot = new Snapshot(
      `${tokenAddress}::${event.params.to.toHexString()}::${timestamp.toString()}`
    );
    prepareAccount(event.params.to);
    snapshot.account = event.params.to.toHexString();
    snapshot.balance = mappingToken.balanceOf(event.params.to);
    snapshot.timestamp = timestamp;
    snapshot.save();
  }
}

function isZeroAddress(address: Address): boolean {
  return address.toHexString() === "0x0000000000000000000000000000000000000000";
}
