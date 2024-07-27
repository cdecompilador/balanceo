import GetBalanceUseCase from "../domain/GetBalanceUseCase";
import type { BalanceState } from "./BalanceState";

type UpdateBalanceTextFn = (newBalance: string) => void;

class BalancePresenter {
  private updateBalanceText: UpdateBalanceTextFn | undefined 

  constructor(private getBalanceUseCase: GetBalanceUseCase) {}

  init(updateBalanceText: UpdateBalanceTextFn) {
    this.updateBalanceText = updateBalanceText

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
    if (this.updateBalanceText && balanceState.kind === "LoadedBalanceState") {
      this.updateBalanceText(balanceState.balance.totalAmmount.toString() + " €")
    }
  }
}

export default BalancePresenter