import type Income from "core/build/income/domain/Income"

export default interface IncomeRepository {
  get(): Promise<Array<Income>>
  remove(incomeId: string): Promise<true>
  add(title: string, type: string, ammount: number): Promise<true>
}
