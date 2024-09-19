import List from './views/List.vue'
import Add from './views/Add.vue'

export const routes = [
  {
    path: "/",
    component: List
  },
  {
    path: "/add",
    component: Add
  }
]