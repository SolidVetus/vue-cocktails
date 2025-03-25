import { defineStore } from 'pinia'
import { ref } from 'vue'
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
    immediate: true,
  })

  const { data: cocktails, refresh } = useQuery({
    key: () => ['cocktails', { ingredient: ingredient.value }],
    query: async () => {
      if (ingredient.value) {
        const { data } = await axios.get(`${COCKTAILS_BY_INGREDIENT_URL}${ingredient.value}`)
        return data?.drinks || []
      }
    },
    enabled: !!ingredient.value,
  })

  const setIngredient = (val) => {
    ingredient.value = val
  }

  return {
    ingredients,
    ingredient,
    cocktails,
    setIngredient,
    refresh,
  }
})
