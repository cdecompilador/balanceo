import type IncomeRepository from "./IncomeRepository"

export default class AddIncomeUseCase {
  constructor(private incomeRepository: IncomeRepository) {}

  execute(title: string, type: string, ammount: number): Promise<true> {
    if (title === undefined || type === undefined || ammount == undefined) {
      return new Promise((accept, reject) => {
        reject("invalid form")
      })
    }

    return this.incomeRepository.add(title, type, ammount)
  }
}
