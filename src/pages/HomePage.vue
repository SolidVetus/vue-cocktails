<template>
  <app-layout :backFunc="removeIngredient" :is-back-button-visible="!!ingredient">
    <div class="wrapper">
      <div v-if="!ingredients || !cocktails || !ingredient" class="info">
        <div class="title">{{ $t('choose_drink') }}</div>
        <div class="select-wrapper">
          <el-select
            v-model="ingredient"
            class="select"
            :placeholder="$t('choose_ingredient')"
            size="large"
            filterable
            allow-create
          >
            <el-option
              v-for="item in ingredients"
              :key="item.strIngredient1"
              :label="item.strIngredient1"
              :value="item.strIngredient1"
            />
          </el-select>
        </div>
        <div class="text">
          {{ $t('cocktails_diclaimer') }}
        </div>
        <img class="img" src="../assets/img/cocktails.png" alt="cocktails" />
      </div>
      <div v-else class="info">
        <div class="title">{{ $t('cocktails_with', { ingredient }) }}</div>
        <ul class="cocktails">
          <cocktail-thumb
            v-for="cocktail in cocktails"
            :key="cocktail.idDrink"
            :cocktail="cocktail"
          />
        </ul>
      </div>
    </div>
  </app-layout>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import CocktailThumb from '../components/CocktailThumb.vue'
import AppLayout from '../components/AppLayout.vue'
import { useRootStore } from '../stores/query.js'

const rootStore = useRootStore()
const { ingredient, ingredients, cocktails } = storeToRefs(rootStore)

const removeIngredient = () => {
  rootStore.setIngredient(null)
}
</script>

<style scoped>
.select-wrapper {
  text-align: center;
  padding-top: 50px;
  width: auto;
}

.select {
  width: auto;
  min-width: 220px;
  max-width: 100%;
}

.text {
  width: 516px;
  margin: 0 auto;
  padding-top: 50px;
  line-height: 36px;
  letter-spacing: 0.1em;
  color: var(--textMuted);
}

.img {
  margin-top: 60px;
  width: 345px;
  height: 120px;
}

.cocktails {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  height: 380px;
  overflow-y: auto;
  margin-top: 60px;
}
</style>
