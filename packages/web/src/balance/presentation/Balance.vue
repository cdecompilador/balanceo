<script setup lang="ts">
import { ref, defineProps } from "vue"

import type BalancePresenter from "./BalancePresenter"

export interface BalanceProps {
  balancePresenter: BalancePresenter
}

const balanceText = ref("")

const props = defineProps<BalanceProps>()

const updateBalanceText = (newText: string) => {
  balanceText.value = newText
}

props.balancePresenter.init(updateBalanceText)

</script>

<template>
  Total Balance: {{ balanceText }}
</template>

