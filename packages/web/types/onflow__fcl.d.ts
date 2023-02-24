// see https://docs.onflow.org/fcl/reference/api/
declare module "@onflow/fcl" {

  /** https://docs.onflow.org/fcl/reference/api/#authorizationobject */
  type AuthorizationObject = {
    addr: Address
    signingFunction: SigningFunction
    tempId: string
    keyId: number
    sequenceNum?: number
  }


  /** https://docs.onflow.org/fcl/reference/api/#authorization-function */
  type AuthorizationFunction = (account: AccountObject) => Promise<AuthorizationObject>

  /** https://developers.flow.com/tools/fcl-js/reference/api#transactionstatusobject */
  type TransactionStatusObject = {
    blockId: string
    events: EventObject[]
    status: TransactionStatus
    statusString: string
    errorMessage: string
    statusCode: GRPCStatus
  }

  export function tx(transactionId: string | ResponseObject): {
    snapshot: () => Promise<unknown>

    // Returns an unsubscribe function
    subscribe: (callback: unknown) => () => void

    onceFinalized: () => Promise<TransactionStatusObject>
    onceExecuted: () => Promise<TransactionStatusObject>
    onceSealed: () => Promise<TransactionStatusObject>
  }

  /** https://docs.onflow.org/fcl/reference/api/#send */
  export function send(builders: Builder[]): Promise<ResponseObject>

  /** https://github.com/onflow/fcl-js/blob/master/packages/sdk/src/build/build-payer.js */
  export function proposer(authz: AuthorizationObject | AuthorizationFunction): Builder

  /** https://github.com/onflow/fcl-js/blob/master/packages/sdk/src/build/build-proposer.js */
  export function payer(authz: AuthorizationObject | AuthorizationFunction): Builder

  /** https://github.com/onflow/fcl-js/blob/master/packages/sdk/src/build/build-authorizations.js */
  export function authorizations(ax: (AuthorizationObject | AuthorizationFunction)[]): Builder

  /** https://developers.flow.com/tools/fcl-js/reference/api#authz */
  export const authz: AuthorizationObject

  export * as t from "@onflow/types"
}