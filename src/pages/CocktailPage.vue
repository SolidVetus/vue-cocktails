<template>
  <div v-if="cocktail" class="wrap">
    <app-layout :imgUrl="cocktail.strDrinkThumb">
      <div class="wrapper">
        <div class="info">
          <div class="title">{{ cocktail.strDrink }}</div>
          <div class="list">
            <div v-for="(item, key) in mappedIngredients" :key="key" class="list-item">
              {{ item.name }}
              <template v-if="item.measure">| {{ item.measure }}</template>
            </div>
          </div>
          <div class="instructions">{{ cocktail.strInstructions }}</div>
        </div>
      </div>
    </app-layout>
  </div>
</template>

<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router'
import AppLayout from '../components/AppLayout.vue'
import { COCKTAIL_BY_ID_URL } from '../constants/'
import { ref, computed, onMounted } from 'vue'

const route = useRoute()

const cocktail = ref([])

const cocktailId = computed(() => route.path.split('/').pop())

const mappedIngredients = computed(() => {
  const ingredients = []

  for (let i = 1; i <= 15; i++) {
    if (!cocktail.value[`strIngredient${i}`]) break

    const ingredient = {}
    ingredient.name = cocktail.value[`strIngredient${i}`]
    ingredient.measure = cocktail.value[`strMeasure${i}`]

    ingredients.push(ingredient)
  }
  return ingredients
})

const getCocktail = async () => {
  const data = await axios.get(`${COCKTAIL_BY_ID_URL}${cocktailId.value}`)
  cocktail.value = data?.data?.drinks[0]
  console.log(cocktail.value)
}

onMounted(() => getCocktail())
</script>

<style scoped>
.list {
  width: 560px;
  padding: 50px 0;
  text-align: left;
}

.list-item {
  position: relative;
  margin-bottom: 20px;
  padding-left: 30px;
}

.list-item:last-child {
  margin-bottom: 0;
}

.list-item::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 17px;
  height: 17px;
  background: url('/src/assets/img/heart.svg') 50%;
}
</style>
