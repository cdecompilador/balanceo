import InMemoryIncomeRepository from "./data/InMemoryIncomeRepository"
import IncomeApiRepository from "./data/IncomeApiRepository"
import GetIncomeUseCase from "./domain/GetIncomeUseCase"
import RemoveIncomeUseCase from "./domain/RemoveIncomeUseCase" 
import AddIncomeUseCase from "./domain/AddIncomeUseCase"
import { IncomeListPresenter } from "./presentation/IncomeListPresenter"
import AddIncomePresenter from "./presentation/AddIncomePresenter"

export function provideIncomeListPresenter(): IncomeListPresenter {
  const incomeRepository = new IncomeApiRepository()
  const getIncomeUseCase = new GetIncomeUseCase(incomeRepository)
  const removeIncomeUseCase = new RemoveIncomeUseCase(incomeRepository)
  const incomeListPresenter = new IncomeListPresenter(getIncomeUseCase, removeIncomeUseCase)

  return incomeListPresenter
}

export function provideAddIncomePresenter(): AddIncomePresenter {
  const incomeRepository = new IncomeApiRepository()
  const addIncomeUseCase = new AddIncomeUseCase(incomeRepository)
  const addIncomePresenter = new AddIncomePresenter(addIncomeUseCase)

  return addIncomePresenter
}
