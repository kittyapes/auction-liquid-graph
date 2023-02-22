// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Account must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Account", id.toString(), this);
    }
  }

  static load(id: string): Account | null {
    return changetype<Account | null>(store.get("Account", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get pools(): Array<string> | null {
    let value = this.get("pools");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set pools(value: Array<string> | null) {
    if (!value) {
      this.unset("pools");
    } else {
      this.set("pools", Value.fromStringArray(<Array<string>>value));
    }
  }

  get redeems(): Array<string> | null {
    let value = this.get("redeems");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set redeems(value: Array<string> | null) {
    if (!value) {
      this.unset("redeems");
    } else {
      this.set("redeems", Value.fromStringArray(<Array<string>>value));
    }
  }

  get swaps(): Array<string> | null {
    let value = this.get("swaps");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set swaps(value: Array<string> | null) {
    if (!value) {
      this.unset("swaps");
    } else {
      this.set("swaps", Value.fromStringArray(<Array<string>>value));
    }
  }

  get auctions(): Array<string> | null {
    let value = this.get("auctions");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set auctions(value: Array<string> | null) {
    if (!value) {
      this.unset("auctions");
    } else {
      this.set("auctions", Value.fromStringArray(<Array<string>>value));
    }
  }

  get bids(): Array<string> | null {
    let value = this.get("bids");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set bids(value: Array<string> | null) {
    if (!value) {
      this.unset("bids");
    } else {
      this.set("bids", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Pool extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Pool entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Pool must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Pool", id.toString(), this);
    }
  }

  static load(id: string): Pool | null {
    return changetype<Pool | null>(store.get("Pool", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get address(): string {
    let value = this.get("address");
    return value!.toString();
  }

  set address(value: string) {
    this.set("address", Value.fromString(value));
  }

  get mappingToken(): string {
    let value = this.get("mappingToken");
    return value!.toString();
  }

  set mappingToken(value: string) {
    this.set("mappingToken", Value.fromString(value));
  }

  get nft(): string {
    let value = this.get("nft");
    return value!.toString();
  }

  set nft(value: string) {
    this.set("nft", Value.fromString(value));
  }

  get tokenIds(): Array<BigInt> {
    let value = this.get("tokenIds");
    return value!.toBigIntArray();
  }

  set tokenIds(value: Array<BigInt>) {
    this.set("tokenIds", Value.fromBigIntArray(value));
  }

  get freeTokenIds(): Array<BigInt> {
    let value = this.get("freeTokenIds");
    return value!.toBigIntArray();
  }

  set freeTokenIds(value: Array<BigInt>) {
    this.set("freeTokenIds", Value.fromBigIntArray(value));
  }

  get createdDate(): BigInt {
    let value = this.get("createdDate");
    return value!.toBigInt();
  }

  set createdDate(value: BigInt) {
    this.set("createdDate", Value.fromBigInt(value));
  }

  get lockPeriod(): BigInt {
    let value = this.get("lockPeriod");
    return value!.toBigInt();
  }

  set lockPeriod(value: BigInt) {
    this.set("lockPeriod", Value.fromBigInt(value));
  }

  get duration(): BigInt {
    let value = this.get("duration");
    return value!.toBigInt();
  }

  set duration(value: BigInt) {
    this.set("duration", Value.fromBigInt(value));
  }

  get isLinear(): boolean {
    let value = this.get("isLinear");
    return value!.toBoolean();
  }

  set isLinear(value: boolean) {
    this.set("isLinear", Value.fromBoolean(value));
  }

  get delta(): BigInt {
    let value = this.get("delta");
    return value!.toBigInt();
  }

  set delta(value: BigInt) {
    this.set("delta", Value.fromBigInt(value));
  }

  get ratio(): BigInt {
    let value = this.get("ratio");
    return value!.toBigInt();
  }

  set ratio(value: BigInt) {
    this.set("ratio", Value.fromBigInt(value));
  }

  get randomFee(): i32 {
    let value = this.get("randomFee");
    return value!.toI32();
  }

  set randomFee(value: i32) {
    this.set("randomFee", Value.fromI32(value));
  }

  get tradingFee(): i32 {
    let value = this.get("tradingFee");
    return value!.toI32();
  }

  set tradingFee(value: i32) {
    this.set("tradingFee", Value.fromI32(value));
  }

  get startPrice(): BigInt {
    let value = this.get("startPrice");
    return value!.toBigInt();
  }

  set startPrice(value: BigInt) {
    this.set("startPrice", Value.fromBigInt(value));
  }

  get feeTypes(): Array<i32> {
    let value = this.get("feeTypes");
    return value!.toI32Array();
  }

  set feeTypes(value: Array<i32>) {
    this.set("feeTypes", Value.fromI32Array(value));
  }

  get feeValues(): Array<i32> {
    let value = this.get("feeValues");
    return value!.toI32Array();
  }

  set feeValues(value: Array<i32>) {
    this.set("feeValues", Value.fromI32Array(value));
  }

  get is721(): boolean {
    let value = this.get("is721");
    return value!.toBoolean();
  }

  set is721(value: boolean) {
    this.set("is721", Value.fromBoolean(value));
  }

  get redeems(): Array<string> | null {
    let value = this.get("redeems");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set redeems(value: Array<string> | null) {
    if (!value) {
      this.unset("redeems");
    } else {
      this.set("redeems", Value.fromStringArray(<Array<string>>value));
    }
  }

  get swaps(): Array<string> | null {
    let value = this.get("swaps");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set swaps(value: Array<string> | null) {
    if (!value) {
      this.unset("swaps");
    } else {
      this.set("swaps", Value.fromStringArray(<Array<string>>value));
    }
  }

  get auctions(): Array<string> | null {
    let value = this.get("auctions");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set auctions(value: Array<string> | null) {
    if (!value) {
      this.unset("auctions");
    } else {
      this.set("auctions", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Redeem extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Redeem entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Redeem must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Redeem", id.toString(), this);
    }
  }

  static load(id: string): Redeem | null {
    return changetype<Redeem | null>(store.get("Redeem", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get account(): string {
    let value = this.get("account");
    return value!.toString();
  }

  set account(value: string) {
    this.set("account", Value.fromString(value));
  }

  get tokenIds(): Array<BigInt> | null {
    let value = this.get("tokenIds");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigIntArray();
    }
  }

  set tokenIds(value: Array<BigInt> | null) {
    if (!value) {
      this.unset("tokenIds");
    } else {
      this.set("tokenIds", Value.fromBigIntArray(<Array<BigInt>>value));
    }
  }
}

export class Swap extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Swap entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Swap must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Swap", id.toString(), this);
    }
  }

  static load(id: string): Swap | null {
    return changetype<Swap | null>(store.get("Swap", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get account(): string {
    let value = this.get("account");
    return value!.toString();
  }

  set account(value: string) {
    this.set("account", Value.fromString(value));
  }

  get inTokenId(): BigInt {
    let value = this.get("inTokenId");
    return value!.toBigInt();
  }

  set inTokenId(value: BigInt) {
    this.set("inTokenId", Value.fromBigInt(value));
  }

  get outTokenId(): BigInt | null {
    let value = this.get("outTokenId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set outTokenId(value: BigInt | null) {
    if (!value) {
      this.unset("outTokenId");
    } else {
      this.set("outTokenId", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class Auction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Auction entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Auction must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Auction", id.toString(), this);
    }
  }

  static load(id: string): Auction | null {
    return changetype<Auction | null>(store.get("Auction", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get starter(): string {
    let value = this.get("starter");
    return value!.toString();
  }

  set starter(value: string) {
    this.set("starter", Value.fromString(value));
  }

  get highestBid(): string | null {
    let value = this.get("highestBid");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set highestBid(value: string | null) {
    if (!value) {
      this.unset("highestBid");
    } else {
      this.set("highestBid", Value.fromString(<string>value));
    }
  }

  get isEnded(): boolean {
    let value = this.get("isEnded");
    return value!.toBoolean();
  }

  set isEnded(value: boolean) {
    this.set("isEnded", Value.fromBoolean(value));
  }

  get startAt(): BigInt {
    let value = this.get("startAt");
    return value!.toBigInt();
  }

  set startAt(value: BigInt) {
    this.set("startAt", Value.fromBigInt(value));
  }

  get expireAt(): BigInt {
    let value = this.get("expireAt");
    return value!.toBigInt();
  }

  set expireAt(value: BigInt) {
    this.set("expireAt", Value.fromBigInt(value));
  }

  get bids(): Array<string> | null {
    let value = this.get("bids");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set bids(value: Array<string> | null) {
    if (!value) {
      this.unset("bids");
    } else {
      this.set("bids", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Bid extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Bid entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Bid must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Bid", id.toString(), this);
    }
  }

  static load(id: string): Bid | null {
    return changetype<Bid | null>(store.get("Bid", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get auction(): string {
    let value = this.get("auction");
    return value!.toString();
  }

  set auction(value: string) {
    this.set("auction", Value.fromString(value));
  }

  get account(): string {
    let value = this.get("account");
    return value!.toString();
  }

  set account(value: string) {
    this.set("account", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }
}
