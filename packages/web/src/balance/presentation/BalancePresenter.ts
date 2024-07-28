import type Balance from "../domain/Balance";
import GetBalanceUseCase from "../domain/GetBalanceUseCase";
import type GetEurUsdUseCase from "../domain/GetEurUsdRatioUseCase";
import type { BalanceState } from "./BalanceState";

class BalancePresenter {
  private updateState: ((newState: BalanceState) => void) | undefined
  private getState: (() => BalanceState)  | undefined

  constructor(
    private getBalanceUseCase: GetBalanceUseCase,
    private getEurUsdRatioUseCase: GetEurUsdUseCase
  ) {}

  init(updateState: (newState: BalanceState) => void, getState: () => BalanceState) {
    this.updateState = updateState
    this.getState = getState

    this.getEurUsdRatioUseCase.init((newRatio) => {
      this.renderFrom((oldState: BalanceState) => {
        if (oldState.kind === "LoadedBalanceState") {
          oldState.balance.eurUsdRatio = newRatio
          return oldState
        } else {
          return oldState
        }
      })
    })
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

  private renderFrom(balanceStateFunctor: (oldBalanceState: BalanceState) => BalanceState) {
    if (this.updateState && this.getState) {
      this.updateState(balanceStateFunctor(this.getState()))
    }
  }

  private render(balanceState: BalanceState) {
    if (this.updateState) {
      this.updateState(balanceState)
    }
  }
}

export default BalancePresenter