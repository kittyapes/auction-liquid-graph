import { Address } from "@graphprotocol/graph-ts";
import { Account } from "../entities/schema";

export function prepareAccount(addr: Address): void {
  let account = Account.load(addr.toHexString());

  if (account == null) {
    account = new Account(addr.toHexString());
    account.address = addr;
  }

  account.save();
}
