import type IncomeRepository from "./IncomeRepository"
import type { Income } from "core"

export default class RemoveIncomeUseCase {
  constructor(private incomeRepository: IncomeRepository) {}

  async execute(incomeId: string): Promise<Array<Income>> {
    await this.incomeRepository.remove(incomeId)
    return await this.incomeRepository.get()
  }
}
