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
    contractId: "CAU4MPUT3SR4NRPOIAVQ4N2ET7FUWHBCKTMUKF65Q5KPAQQMCTSOFOSO",
  }
} as const

export type YeetKey = {tag: "Of", values: readonly [string]};


export interface Yeet {
  author: string;
  likes: u64;
  message: string;
  replies: Array<Yeet>;
}

export const Errors = {

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
  reply: ({user, reply, id, added_validity}: {user: string, reply: string, id: string, added_validity: u32}, options?: {
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
  }) => Promise<AssembledTransaction<Yeet>>

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAgAAAAAAAAAAAAAAB1llZXRLZXkAAAAAAQAAAAEAAAAAAAAAAk9mAAAAAAABAAAAEA==",
        "AAAAAQAAAAAAAAAAAAAABFllZXQAAAAEAAAAAAAAAAZhdXRob3IAAAAAABMAAAAAAAAABWxpa2VzAAAAAAAABgAAAAAAAAAHbWVzc2FnZQAAAAAQAAAAAAAAAAdyZXBsaWVzAAAAA+oAAAfQAAAABFllZXQ=",
        "AAAAAAAAAAAAAAAEeWVldAAAAAQAAAAAAAAABHVzZXIAAAATAAAAAAAAAAdtZXNzYWdlAAAAABAAAAAAAAAAAmlkAAAAAAAQAAAAAAAAABBpbml0aWFsX3ZhbGlkaXR5AAAABAAAAAEAAAfQAAAABFllZXQ=",
        "AAAAAAAAAAAAAAAFcmVwbHkAAAAAAAAEAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAFcmVwbHkAAAAAAAAQAAAAAAAAAAJpZAAAAAAAEAAAAAAAAAAOYWRkZWRfdmFsaWRpdHkAAAAAAAQAAAABAAAH0AAAAARZZWV0",
        "AAAAAAAAAAAAAAAGc2hlZXNoAAAAAAADAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAACaWQAAAAAABAAAAAAAAAADmFkZGVkX3ZhbGlkaXR5AAAAAAAEAAAAAQAAB9AAAAAEWWVldA==",
        "AAAAAAAAAAAAAAAIZ2V0X3llZXQAAAABAAAAAAAAAAJpZAAAAAAAEAAAAAEAAAfQAAAABFllZXQ=" ]),
      options
    )
  }
  public readonly fromJSON = {
    yeet: this.txFromJSON<Yeet>,
        reply: this.txFromJSON<Yeet>,
        sheesh: this.txFromJSON<Yeet>,
        get_yeet: this.txFromJSON<Yeet>
  }
}