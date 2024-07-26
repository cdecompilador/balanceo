import type IncomeRepository from "../domain/IncomeRepository";
import type { Income } from "core";

// NOTE: not used for the moment, only for some manual testing
export default class IncomeApiRepository implements IncomeRepository {
  private readonly baseApiUrl = "http://localhost:3000/api"

  async get(): Promise<Array<Income>> {
    try {
      const response = await fetch(`${this.baseApiUrl}/income`)
      if (!response.ok) {
        throw new Error("failed to fetch")
      }
      const incomes: Array<Income> = await response.json()
      return incomes
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async remove(incomeId: string): Promise<true> {
    try {
      const response = await fetch(`${this.baseApiUrl}/income/${incomeId}`, {
        method: "DELETE"
      })
      if (!response.ok) {
        throw new Error("Failed to fetch")
      }
      return await response.json()

    } catch (error) {
      console.log(error)
      throw error
    }
  }
  
  async add(title: string, type: string, ammount: number): Promise<true> {
    try {
      const newIncome = {
        title,
        type,
        ammount
      }

      const response = await fetch(`${this.baseApiUrl}/income`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newIncome)
      })
      if (!response.ok) {
        throw new Error("Failed to fetch")
      }
      
      return true
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}