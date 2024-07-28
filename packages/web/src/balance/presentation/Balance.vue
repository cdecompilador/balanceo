<script setup lang="ts">
import { ref, defineProps } from "vue"

import type BalancePresenter from "./BalancePresenter"
import type Balance from "../domain/Balance"
import type { BalanceState } from "./BalanceState"
import { initialBalanceState, type LoadingBalanceState, type LoadedBalanceState } from "./BalanceState"

export interface BalanceProps {
  balancePresenter: BalancePresenter
}

const balanceState = ref(initialBalanceState)

const props = defineProps<BalanceProps>()

const updateState = (newState: BalanceState) => balanceState.value = newState
const getState = () => balanceState.value

props.balancePresenter.init(updateState, getState)

</script>

<template>
  <div v-if="balanceState.kind === 'LoadingBalanceState'">
    Loading...
  </div>
  <div v-if="balanceState.kind === 'LoadedBalanceState'">
    Total Balance: 
    <strong>
      {{ balanceState.balance.totalAmmount + " €" }}
    </strong>
      {{ balanceState.balance.eurUsdRatio ? "$" + (balanceState.balance.totalAmmount * balanceState.balance.eurUsdRatio) : "" }}
    <br>
    Expected next month Balance: {{ balanceState.balance.periodicTotalAmmount + " €" }} <br>
    <br>
  </div>
</template>