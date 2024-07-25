import type IncomeRepository from "./IncomeRepository"
import type Income from "core/build/income/domain/Income"

export default class RemoveIncomeUseCase {
  constructor(private incomeRepository: IncomeRepository) {}

  async execute(incomeId: string): Promise<Array<Income>> {
    console.log(await this.incomeRepository.remove(incomeId))
    return await this.incomeRepository.get()
  }
}
