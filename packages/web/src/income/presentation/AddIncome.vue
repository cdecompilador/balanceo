<script setup lang="ts">

import AddIncomePresenter from "./AddIncomePresenter"
import { provideAddIncomePresenter } from "../DependenciesProvider"
import router from "../../router"

let addIncomePresenter = provideAddIncomePresenter()

addIncomePresenter.init(() => {
  router.go(-1)
})

function getFormData() {
  const title = document.getElementById("title").value;
  let type = undefined;
  if (document.getElementById("type-salary").checked) {
    type = "salary" 
  } else if (document.getElementById("type-transfer").checked) {
    type = "transfer"
  }
  const ammount = parseInt(document.getElementById("ammount").value);

  addIncomePresenter.addIncomeFromForm(title, type, ammount)
}
</script>


<template>
  <br>
  <form @submit="(e) => {  e.preventDefault(); getFormData(); }">
    <label for="title">Income name: </label> <br>
    <input type="text" id="title" name="title"></input> <br> <br>
    
    <label>Type of income:</label> <br>
    <input type="radio" id="type-salary" name="type">Salary</input>
    <input type="radio" id="type-transfer" name="type">Transfer</input> <br> <br>

    <label>Ammount:</label> <br>
    <input type="number" id="ammount" placeholder="ex: 100 €"></input> <br> <br>

    <input type="submit" value="Add"></input>
  </form>
</template>
