import { createRouter, createWebHistory } from "vue-router"

import Home from "./home/Home.vue"
import AddIncome from "./income/presentation/AddIncome.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/new-income",
      name: "new-income",
      component: AddIncome
    }
  ]
})

export default router
