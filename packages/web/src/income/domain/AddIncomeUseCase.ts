import type IncomeRepository from "./IncomeRepository"

export default class AddIncomeUseCase {
  constructor(private incomeRepository: IncomeRepository) {}

  execute(title: string, type: string, ammount: number, periodic: boolean): Promise<true> {
    if (title === undefined || type === undefined || ammount === undefined || periodic === undefined) {
      return new Promise((accept, reject) => {
        reject("invalid form")
      })
    }

    return this.incomeRepository.add(title, type, ammount, periodic)
  }
}
