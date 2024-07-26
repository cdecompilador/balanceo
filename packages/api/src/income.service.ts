import { Injectable } from "@nestjs/common"
import { Income } from "core"
import { v4 as uuidv4 } from "uuid"


@Injectable()
export class IncomeService {
  private incomes: Array<Income> = [{
    id: uuidv4(),
    title: "example",
    type: "example",
    ammount: 10
  }]

  getAll(): Array<Income> {
    return this.incomes
  }

  add(income: Omit<Income, "id">): Income {
    const newIncome: Income = { id: uuidv4(), ...income }
    this.incomes.push(newIncome)

    return newIncome
  }

  remove(id: string): boolean {
    const initialLength = this.incomes.length
    this.incomes = this.incomes.filter(income => income.id !== id)

    return this.incomes.length < initialLength
  }
}
