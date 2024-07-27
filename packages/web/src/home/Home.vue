<script setup lang="ts">
import IncomeList from "../income/presentation/IncomeList.vue"
import Balance from "../balance/presentation/Balance.vue"
import type BalancePresenter from "../balance/presentation/BalancePresenter"
import { provideBalancePresenter } from "../balance/DependenciesProvider"

let balancePresenter: BalancePresenter = provideBalancePresenter()

</script>

<template>
  <Balance :balancePresenter="balancePresenter" />
  <IncomeList :balancePresenter="balancePresenter" />
</template>
