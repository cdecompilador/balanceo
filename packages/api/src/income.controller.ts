import { 
  Controller, 
  Get, Post, Delete, 
  Param, Body,
  HttpException, HttpStatus
} from "@nestjs/common"
import { Income } from "core"
import { IncomeService } from "./income.service"

@Controller("api/income")
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Get()
  getAllIncomes(): Array<Income> {
    return this.incomeService.getAll()
  }

  @Post()
  addIncome(@Body() incomeData: Omit<Income, "id">): Income {
    // NOTE: the data needs to be validated here even if it was on the frontend
    // TODO: I should use a Pipe 
    if (!incomeData.title || !incomeData.type || !incomeData.ammount || !incomeData.periodic) {
      throw new HttpException("Invalid data", HttpStatus.BAD_REQUEST)
    }

    return this.incomeService.add(incomeData)
  }

  @Delete(":id")
  removeIncome(@Param("id") id: string): { success: boolean } {
    const success = this.incomeService.remove(id)
    if (!success) {
      throw new HttpException("Income not found", HttpStatus.NOT_FOUND)
    }

    return { success }
  }
}
