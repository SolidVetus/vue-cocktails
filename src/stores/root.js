import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import { INGREDIENTS_URL, COCKTAILS_BY_INGREDIENT_URL } from '../constants'

export const useRootStore = defineStore('root', () => {
  const ingredients = ref([])
  const ingredient = ref(null)
  const cocktails = ref([])

  const getIngredients = async () => {
    try {
      const data = await axios.get(INGREDIENTS_URL)
      ingredients.value = data?.data?.drinks
    } catch (err) {
      console.error('Ошибка при загрузке ингредиентов:', err)
    }
  }

  const getCocktails = async (ingredient) => {
    try {
      const data = await axios.get(`${COCKTAILS_BY_INGREDIENT_URL}${ingredient}`)
      cocktails.value = data?.data?.drinks
    } catch (err) {
      console.error('Ошибка при загрузке коктелей:', err)
    }
  }

  const setIngredient = (val) => {
    ingredient.value = val
  }

  return { ingredients, ingredient, cocktails, getIngredients, getCocktails, setIngredient }
})
