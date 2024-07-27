import type IncomeRepository from "../domain/IncomeRepository"
import type { Income } from "core"

let initialIncomes: Array<Income> = [
  {
    id: "0",
    type: "job",
    title: "sueldo",
    ammount: 200,
    periodic: true
  },
  {
    id: "1",
    type: "transfer",
    title: "regalo cumpleaños",
    ammount: 10,
    periodic: false 
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
  
  add(title: string, type: string, ammount: number, periodic: boolean): Promise<true> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newIncome: Income = {
          id: (initialIncomes.length + 1).toString(),
          title,
          type,
          ammount,
          periodic
        }
        initialIncomes = [ ...initialIncomes, newIncome ]
        console.log(initialIncomes)

        resolve(true)
      }, 100)
    })
  }
}
