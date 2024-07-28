import IncomeApiRepository from "../income/data/IncomeApiRepository";
import GetBalanceUseCase from "./domain/GetBalanceUseCase";
import BalancePresenter from "./presentation/BalancePresenter"; 
import BinanceApiEurUsdProvider from "./data/BinanceApiEurUsdProvider"
import GetEurUsdUseCase from "./domain/GetEurUsdRatioUseCase";

export function provideBalancePresenter() {
  const incomeRepository = new IncomeApiRepository()
  const eurUsdProvider = new BinanceApiEurUsdProvider()
  const getBalanceUseCase = new GetBalanceUseCase(incomeRepository)
  const getEurUsdRatioUseCase = new GetEurUsdUseCase(eurUsdProvider)
  const balancePresenter = new BalancePresenter(getBalanceUseCase, getEurUsdRatioUseCase)

  return balancePresenter
}