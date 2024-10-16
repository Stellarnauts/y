import { Buffer } from "buffer";
import { Address } from '@stellar/stellar-sdk';
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CC53VVB4VWJWKP75I3ZFP3ZOYUOW7Z666CC2IPHUD34OZ6PSB75EDP2Y",
  }
} as const

export const Errors = {
  1: {message:"NoParentYeet"},

  2: {message:"ThatYeetDoesNotExistStupid"}
}
export type YeetKey = {tag: "Of", values: readonly [string]};


export interface Yeet {
  author: string;
  id: string;
  likes: u64;
  message: string;
  parent_id: string;
}


export interface Client {
  /**
   * Construct and simulate a yeet transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  yeet: ({user, message, id, initial_validity}: {user: string, message: string, id: string, initial_validity: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Yeet>>

  /**
   * Construct and simulate a reply transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  reply: ({user, reply, id, parent_id, added_validity}: {user: string, reply: string, id: string, parent_id: string, added_validity: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<Yeet>>>

  /**
   * Construct and simulate a sheesh transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  sheesh: ({user, id, added_validity}: {user: string, id: string, added_validity: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Yeet>>

  /**
   * Construct and simulate a get_yeet transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_yeet: ({id}: {id: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<Yeet>>>

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAAAgAAAAAAAAAMTm9QYXJlbnRZZWV0AAAAAQAAAAAAAAAaVGhhdFllZXREb2VzTm90RXhpc3RTdHVwaWQAAAAAAAI=",
        "AAAAAgAAAAAAAAAAAAAAB1llZXRLZXkAAAAAAQAAAAEAAAAAAAAAAk9mAAAAAAABAAAAEA==",
        "AAAAAQAAAAAAAAAAAAAABFllZXQAAAAFAAAAAAAAAAZhdXRob3IAAAAAABMAAAAAAAAAAmlkAAAAAAAQAAAAAAAAAAVsaWtlcwAAAAAAAAYAAAAAAAAAB21lc3NhZ2UAAAAAEAAAAAAAAAAJcGFyZW50X2lkAAAAAAAAEA==",
        "AAAAAAAAAAAAAAAEeWVldAAAAAQAAAAAAAAABHVzZXIAAAATAAAAAAAAAAdtZXNzYWdlAAAAABAAAAAAAAAAAmlkAAAAAAAQAAAAAAAAABBpbml0aWFsX3ZhbGlkaXR5AAAABAAAAAEAAAfQAAAABFllZXQ=",
        "AAAAAAAAAAAAAAAFcmVwbHkAAAAAAAAFAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAFcmVwbHkAAAAAAAAQAAAAAAAAAAJpZAAAAAAAEAAAAAAAAAAJcGFyZW50X2lkAAAAAAAAEAAAAAAAAAAOYWRkZWRfdmFsaWRpdHkAAAAAAAQAAAABAAAD6QAAB9AAAAAEWWVldAAAAAM=",
        "AAAAAAAAAAAAAAAGc2hlZXNoAAAAAAADAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAACaWQAAAAAABAAAAAAAAAADmFkZGVkX3ZhbGlkaXR5AAAAAAAEAAAAAQAAB9AAAAAEWWVldA==",
        "AAAAAAAAAAAAAAAIZ2V0X3llZXQAAAABAAAAAAAAAAJpZAAAAAAAEAAAAAEAAAPpAAAH0AAAAARZZWV0AAAAAw==" ]),
      options
    )
  }
  public readonly fromJSON = {
    yeet: this.txFromJSON<Yeet>,
        reply: this.txFromJSON<Result<Yeet>>,
        sheesh: this.txFromJSON<Yeet>,
        get_yeet: this.txFromJSON<Result<Yeet>>
  }
}