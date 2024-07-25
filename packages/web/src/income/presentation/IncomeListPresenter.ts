import GetIncomeUseCase from "../domain/GetIncomeUseCase"
import RemoveIncomeUseCase from "../domain/RemoveIncomeUseCase"
import type {
  IncomeListState,
} from "./IncomeListState"

export type UpdateStateFn = (incomeListState: IncomeListState) => void;

export class IncomeListPresenter {
  updateState: UpdateStateFn | undefined
  
  constructor(
    private getIncomeUseCase: GetIncomeUseCase,
    private removeIncomeUseCase: RemoveIncomeUseCase
  ) {}

  init(updateState: UpdateStateFn) {
    this.updateState = updateState
    
    this.getIncomeUseCase.execute()
      .then((incomes) => this.render({
        kind: "LoadedIncomeListState",
        incomes: incomes
      }))
      .catch(error => this.render({
        kind: "ErrorIncomeListState",
        message: "Something failed with the backend"
      }))
  }

  removeIncome(toRemoveId: string) {
    this.removeIncomeUseCase.execute(toRemoveId)
      .then((incomes) => this.render({
        kind:"LoadedIncomeListState",
        incomes
      }))
      .catch(error => this.render({
        kind: "ErrorIncomeListState",
        message: "Something failed with the backend"
      }))
  }

  private render(incomeListState: IncomeListState) {
    if (this.updateState) {
      this.updateState(incomeListState)
    } else {
      console.log("unreachable error")
    }
  }
}
