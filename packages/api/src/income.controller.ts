import { 
  Controller, 
  Get, Post, Delete, 
  Param, Body,
  HttpException, HttpStatus
} from "@nestjs/common"
import Income from "core/build/income/domain/Income"
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
    console.log("AQUI")
    if (!incomeData.title || !incomeData.type || !incomeData.ammount) {
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
