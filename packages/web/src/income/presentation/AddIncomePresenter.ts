import AddIncomeUseCase from "../domain/AddIncomeUseCase"

type RedirectHomeFn = () => void

export default class AddIncomePresenter {
  redirectHome: RedirectHomeFn | undefined
  
  constructor(private addIncomeUseCase: AddIncomeUseCase) {}

  init(redirectHome: RedirectHomeFn) {
    this.redirectHome = redirectHome
  }

  addIncomeFromForm(title: string, type: string, ammount: number, periodic: boolean) {
    this.addIncomeUseCase.execute(title, type, ammount, periodic)
      .then((_) => {
        if (this.redirectHome)
          this.redirectHome()
      })
      .catch((err: any) => console.log(err))
  }
}
