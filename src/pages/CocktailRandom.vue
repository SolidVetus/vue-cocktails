<template>
  <div v-if="cocktail" class="wrap">
    <app-layout :imgUrl="cocktail.strDrinkThumb" @slot-key="getCocktail">
      <div class="wrapper">
        <div class="info">
          <div class="title">{{ cocktail.strDrink }}</div>
          <ul class="swiper">
            <swiper
              :slides-per-view="mappedIngredients.length < 3 ? mappedIngredients.length : 3"
              :space-between="50"
              :loop="mappedIngredients.length > 3"
              :autoplay="{ delay: 1500, disableOnInteraction: false }"
              :modules="[Autoplay]"
            >
              <swiper-slide
                class="swiper-element"
                v-for="(ingredient, key) in mappedIngredients"
                :key="key"
              >
                <img
                  :src="`${INGREDIENT_PIC}${ingredient}-small.png`"
                  :alt="`${ingredient}-small`"
                  @error="onImgError"
                />
                <div class="name">
                  {{ ingredient }}
                </div>
              </swiper-slide>
            </swiper>
          </ul>
          <div class="instructions">{{ instructions }}</div>
        </div>
      </div>
    </app-layout>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import AppLayout from '../components/AppLayout.vue'
import { COCKTAIL_RANDOM, INGREDIENT_PIC } from '../constants/api.js'

const { locale } = useI18n()
const cocktail = ref([])

const mappedIngredients = computed(() => {
  const ingredients = []

  for (let i = 1; i <= 15; i++) {
    if (!cocktail.value[`strIngredient${i}`]) break

    const ingredient = cocktail.value[`strIngredient${i}`]

    ingredients.push(ingredient)
  }
  return ingredients
})

const instructions = computed(() => {
  const langKey = locale.value.toUpperCase()
  return cocktail.value[`strInstructions${langKey}`] || cocktail.value.strInstructions
})

const getCocktail = async () => {
  try {
    const data = await axios.get(COCKTAIL_RANDOM)
    cocktail.value = data?.data?.drinks[0]
  } catch (err) {
    console.error('Ошибка при загрузке коктейлей:', err)
  }
}

getCocktail()
</script>

<style scoped>
.swiper {
  margin: 0;
  padding-top: 25px;
  padding-bottom: 25px;
  width: 586px;
}

.swiper-element {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.name {
  padding-top: 20px;
}
</style>
