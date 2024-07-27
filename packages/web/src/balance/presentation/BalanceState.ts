import type Balance from "../domain/Balance"

export interface LoadedBalanceState {
  kind: "LoadedBalanceState"
  balance: Balance 
}

export interface LoadingBalanceState {
  kind: "LoadingBalanceState"
}

export interface ErrorBalanceState {
  kind: "ErrorBalanceState"
  message: string
}

export type BalanceState = LoadedBalanceState | LoadingBalanceState | ErrorBalanceState