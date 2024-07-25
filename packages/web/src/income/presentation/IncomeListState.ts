import type Income from "core/build/income/domain/Income"

export interface CommonIncomeListState {
  // TODO: add sorting stuff 
}

export interface LoadingIncomeListState {
  kind: "LoadingIncomeListState"
}

export interface LoadedIncomeListState {
  kind: "LoadedIncomeListState",
  incomes: Array<Income>
}

export interface ErrorIncomeListState {
  kind: "ErrorIncomeListState"
  message: string
}

export type IncomeListState = (LoadingIncomeListState | LoadedIncomeListState | ErrorIncomeListState) & CommonIncomeListState

export const initialIncomeListState: IncomeListState = {
  kind: "LoadingIncomeListState"
}
