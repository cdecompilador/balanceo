<script setup lang="ts">
import { ref } from "vue"
import { RouterLink } from "vue-router"

import IncomeItem from "./IncomeItem.vue"
import { provideIncomeListPresenter } from "../DependenciesProvider"
import { type IncomeListState, initialIncomeListState } from "./IncomeListState"
import type BalancePresenter from "@/balance/presentation/BalancePresenter"

export interface IncomeListProps {
  balancePresenter: BalancePresenter
}

const props = defineProps<IncomeListProps>()

const incomePresenter = provideIncomeListPresenter()

let incomeListState = ref(initialIncomeListState)

const changeState = (newIncomeListState: IncomeListState) => {
  incomeListState.value = newIncomeListState
}

incomePresenter.init(changeState, props.balancePresenter)

</script>

<template>
  <br>
  Incomes:
  <template v-if="incomeListState.kind==='LoadedIncomeListState' && incomeListState.incomes.length > 0">
  <ul v-for="income in incomeListState.incomes">
    <li>
      <IncomeItem :income @income-removed="(id) => incomePresenter.removeIncome(id)"/>
    </li>
  </ul>
  </template>
  <template v-else-if="incomeListState.kind==='LoadingIncomeListState'">
    Loading...
  </template>
  <template v-else>
    You have no registered incomes for this month. Click to add some.
  </template>
  <RouterLink to="new-income">Add new income</RouterLink>
</template>
