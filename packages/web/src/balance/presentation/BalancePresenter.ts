import type Balance from "../domain/Balance";
import GetBalanceUseCase from "../domain/GetBalanceUseCase";
import type { BalanceState } from "./BalanceState";

type UpdateBalanceTextFn = (newBalance: Balance) => void;

class BalancePresenter {
  private updateBalance: UpdateBalanceTextFn | undefined 

  constructor(private getBalanceUseCase: GetBalanceUseCase) {}

  init(updateBalance: UpdateBalanceTextFn) {
    this.updateBalance = updateBalance

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
    if (this.updateBalance && balanceState.kind === "LoadedBalanceState") {
      this.updateBalance(balanceState.balance)
    }
  }
}

export default BalancePresenter