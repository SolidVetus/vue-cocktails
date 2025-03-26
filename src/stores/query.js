import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useQuery } from '@pinia/colada'
import axios from 'axios'
import { INGREDIENTS_URL, COCKTAILS_BY_INGREDIENT_URL } from '../constants'

export const useRootStore = defineStore('root', () => {
  const ingredient = ref(null)

  const { data: ingredients } = useQuery({
    key: ['ingredients'],
    query: async () => {
      const { data } = await axios.get(INGREDIENTS_URL)
      return data?.drinks || []
    },
    onError: (err) => console.error('Ошибка загрузки ингредиентов:', err),
  })

  const cocktailsKey = computed(() => ['cocktails', { ingredient: ingredient.value }])

  const { data: cocktails } = useQuery({
    key: cocktailsKey,
    query: async () => {
      if (ingredient.value) {
        const { data } = await axios.get(`${COCKTAILS_BY_INGREDIENT_URL}${ingredient.value}`)
        return data?.drinks || []
      }
    },
    onError: (err) => console.error('Ошибка загрузки коктейлей:', err),
  })

  const setIngredient = (val) => {
    ingredient.value = val
  }

  return {
    ingredients,
    ingredient,
    cocktails,
    setIngredient,
  }
})
