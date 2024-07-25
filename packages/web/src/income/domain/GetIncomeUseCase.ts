import type IncomeRepository from "./IncomeRepository"
import type Income from "core/build/income/domain/Income"

export default class GetIncomeUseCase {
  constructor(private incomeRepository: IncomeRepository) {}

  execute(): Promise<Array<Income>> {
    return this.incomeRepository.get()
  }
}
