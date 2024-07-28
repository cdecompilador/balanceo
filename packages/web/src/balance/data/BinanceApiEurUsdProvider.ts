import { EurUsdProvider } from "../domain/EurUsdProvider";

const wsUrl = "wss://stream.binance.com:9443/ws/eurusdt@trade"

class BinanceApiEurUsdProvider extends EurUsdProvider {
  constructor() {
    super()

    const ws = new WebSocket(wsUrl)
    ws.onmessage = (event) => {
      const priceRatio = parseFloat(JSON.parse(event.data).p)
      if (this.handler)
        this.handler(priceRatio)
    }
    ws.onerror = (error) => {
      console.error("Websocket error:", error)
    }
  }
}

export default BinanceApiEurUsdProvider