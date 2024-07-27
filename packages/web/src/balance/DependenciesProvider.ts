import IncomeApiRepository from "../income/data/IncomeApiRepository";
import GetBalanceUseCase from "./domain/GetBalanceUseCase";
import BalancePresenter from "./presentation/BalancePresenter"; 

export function provideBalancePresenter() {
  const incomeRepository = new IncomeApiRepository()
  const getBalanceUseCase = new GetBalanceUseCase(incomeRepository)
  const balancePresenter = new BalancePresenter(getBalanceUseCase)

  return balancePresenter
}