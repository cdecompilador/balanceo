import { EurUsdProvider } from "./EurUsdProvider";

type GetEurUsdHandler = (ratio: number) => void

class GetEurUsdUseCase {
  constructor(private eurUsdProvider: EurUsdProvider) {}

  init(handler: GetEurUsdHandler) {
    this.eurUsdProvider.registerHandler(handler)
  }
}

export default GetEurUsdUseCase