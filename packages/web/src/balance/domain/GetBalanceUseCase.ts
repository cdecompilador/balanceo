import type IncomeRepository from "@/income/domain/IncomeRepository"
import type Balance from "./Balance"

class GetBalanceUseCase {
  constructor(private incomeRepository: IncomeRepository) {}

  async execute(): Promise<Balance> {
    const incomes = await this.incomeRepository.get()
    let totalAmmount = 0
    for (let i = 0; i < incomes.length; i++) {
      totalAmmount += incomes[i].ammount
    }

    return {
      totalAmmount
    }
  }
}

export default GetBalanceUseCase