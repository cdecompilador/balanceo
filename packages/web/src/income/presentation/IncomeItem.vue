<script setup lang="ts">
import type { Income } from "core"

const props = defineProps<{
  income: Income
}>()
const emit = defineEmits(["income-removed"])
</script>

<template>
  <div>
    <div>{{ props.income.title }} {{ props.income.periodic ? "⟳" : "" }} </div>
    <div>{{ props.income.ammount }} € </div>
    <button @click="emit('income-removed', props.income.id)">Remove</button>
  </div>
</template>
