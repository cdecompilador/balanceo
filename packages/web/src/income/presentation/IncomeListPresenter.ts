import type BalancePresenter from "@/balance/presentation/BalancePresenter";
import GetIncomeUseCase from "../domain/GetIncomeUseCase"
import RemoveIncomeUseCase from "../domain/RemoveIncomeUseCase"
import type {
  IncomeListState,
} from "./IncomeListState"

export type UpdateStateFn = (incomeListState: IncomeListState) => void;

export class IncomeListPresenter {
  updateState: UpdateStateFn | undefined
  balancePresenter: BalancePresenter | undefined
  
  constructor(
    private getIncomeUseCase: GetIncomeUseCase,
    private removeIncomeUseCase: RemoveIncomeUseCase,
  ) {}

  init(updateState: UpdateStateFn, balancePresenter: BalancePresenter) {
    this.updateState = updateState
    this.balancePresenter = balancePresenter
    
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
      .then((incomes) => {
        this.render({
          kind:"LoadedIncomeListState",
          incomes
        })
        if (this.balancePresenter)
          this.balancePresenter.incomeChange()
      })
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
