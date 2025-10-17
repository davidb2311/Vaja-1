import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RecipesView from '@/views/RecipesView.vue'
import FavView from '@/views/FavView.vue'
import RecipeView from '@/views/RecipeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/recipes/:recipe/type/:type',
    name: 'recipes',
    component: RecipesView
  },
  {
    path: '/recipe/:recipe',
    name: 'recipe',
    component: RecipeView
  },
  {
    path: '/favourites',
    name: 'favourites',
    component: FavView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
