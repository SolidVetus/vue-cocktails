<template>
  <div class="root">
    <img :src="imgUrl" alt="Cocktail Image" class="main-img" />
    <div class="main">
      <div class="btns">
        <el-button
          v-if="isBackButtonVisible"
          type="success"
          :icon="Back"
          circle
          class="back"
          @click="goBack"
        />
        <el-button class="btn" @click="goForRandomCocktail">Get random cocktail</el-button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { Back } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ROUTES_PATHS } from '../constants'

const props = defineProps({
  imgUrl: {
    type: String,
    default: '/src/assets/img/bg-1.jpg',
  },
  backFunc: {
    type: Function,
  },
  isBackButtonVisible: {
    type: Boolean,
    default: true,
  },
})

const route = useRoute()
const router = useRouter()

const routeName = computed(() => route.name)

const goForRandomCocktail = () => {
  router.push(ROUTES_PATHS.COCKTAIL_RANDOM)
  if (routeName.value === ROUTES_PATHS.COCKTAIL_RANDOM) {
    router.go()
  }
}

const goBack = () => {
  props.backFunc ? props.backFunc() : router.go(-1)
}
</script>

<style scoped>
.root {
  display: flex;
  min-height: 100vh;
  background-color: var(--background);
}

.main-img {
  width: 50%;
  height: 100vh;
  object-fit: cover;
}

.main {
  position: relative;
  width: 50%;
  height: 100vh;
  padding: 32px 40px;
}

.btn {
  position: absolute;
  top: 32px;
  right: 40px;
  font-size: 16px;
  font-family: 'Raleway', 'Arial', sans-serif;
  background-color: var(--accent);
  border-color: var(--accent);
  color: var(--text);
}

.btn:hover,
.btn:active {
  filter: brightness(90%);
}

.btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back {
  background-color: transparent;
  border-color: #fff;
}

.back:hover {
  border-color: var(--accent);
  color: var(--accent);
}
</style>
