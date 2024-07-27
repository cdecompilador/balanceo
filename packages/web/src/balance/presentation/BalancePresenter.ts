import type Balance from "../domain/Balance";
import GetBalanceUseCase from "../domain/GetBalanceUseCase";
import type { BalanceState } from "./BalanceState";

type UpdateBalanceStateFn = (newState: BalanceState) => void;

class BalancePresenter {
  private updateState: UpdateBalanceStateFn | undefined 

  constructor(private getBalanceUseCase: GetBalanceUseCase) {}

  init(updateState: UpdateBalanceStateFn) {
    this.updateState = updateState

    this.incomeChange()
  }

  incomeChange() {
    this.getBalanceUseCase.execute()
      .then((balance) => {
        this.render({
          kind: "LoadedBalanceState",
          balance
        })
      })
      .catch((_) => {
        this.render({
          kind: "ErrorBalanceState",
          message: "unexpected error calculating balance"
        })
      })
  }

  private render(balanceState: BalanceState) {
    if (this.updateState) {
      this.updateState(balanceState)
    }
  }
}

export default BalancePresenter