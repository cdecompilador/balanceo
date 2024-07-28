export type EurUsdRatioHandler = (ratio: number) => void

export abstract class EurUsdProvider {
  handler: EurUsdRatioHandler | undefined

  registerHandler(handler: EurUsdRatioHandler): void {
    this.handler = handler
  }
}