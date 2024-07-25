import type IncomeRepository from "../domain/IncomeRepository"
import type Income from "core/build/income/domain/Income"

let initialIncomes = [
  {
    id: "0",
    type: "job",
    title: "sueldo",
    ammount: 200
  },
  {
    id: "1",
    type: "transfer",
    title: "regalo cumpleaños",
    ammount: 10
  }
]

export default class InMemoryIncomeRepository implements IncomeRepository {
  get(): Promise<Array<Income>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(initialIncomes)
      }, 100)
    })
  }

  remove(incomeId: string): Promise<true> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        initialIncomes = initialIncomes.filter((income) => income.id !== incomeId)
        resolve(true)
      })
    })
  }
  
  add(title: string, type: string, ammount: number): Promise<true> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newIncome: Income = {
          id: (initialIncomes.length + 1).toString(),
          title: title,
          type: type,
          ammount: ammount
        }
        initialIncomes = [ ...initialIncomes, newIncome ]
        console.log(initialIncomes)

        resolve(true)
      }, 100)
    })
  }
}
