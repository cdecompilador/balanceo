<script setup lang="ts">
import { ref, defineProps } from "vue"

import type BalancePresenter from "./BalancePresenter"
import type Balance from "../domain/Balance";

export interface BalanceProps {
  balancePresenter: BalancePresenter
}

const totalBalanceText = ref("")
const periodicBalanceText = ref("")

const props = defineProps<BalanceProps>()

const updateBalance = (newBalance: Balance) => {
  totalBalanceText.value = newBalance.totalAmmount.toString() + " €"
  periodicBalanceText.value = newBalance.periodicTotalAmmount.toString() + " €"
}

props.balancePresenter.init(updateBalance)

</script>

<template>
  Total Balance: {{ totalBalanceText }} <br>
  Expected next month Balance: {{ periodicBalanceText }} <br>
</template>

