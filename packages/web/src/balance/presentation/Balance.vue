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

props.balancePresenter.init(updateState)

</script>

<template>
  <div v-if="balanceState.kind === 'LoadingBalanceState'">
    Loading...
  </div>
  <div v-if="balanceState.kind === 'LoadedBalanceState'">
    Total Balance: <strong>{{ balanceState.balance.totalAmmount + " €" }}</strong> <br>
    Expected next month Balance: {{ balanceState.balance.periodicTotalAmmount + " €" }} <br>
  </div>
</template>