<template>
  <li class="root">
    <RouterLink :to="`/cocktails/${cocktail.idDrink}`">
      <div class="pic" :style="`background-image: url(${cocktail.strDrinkThumb})`"></div>
      <div class="name">{{ cocktail.strDrink }}</div>
    </RouterLink>
  </li>
</template>

<script setup>
const { cocktail } = defineProps({
  cocktail: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc((100% - 76px) / 3);
  min-height: 180px;
  margin-right: 38px;
  padding-bottom: 20px;
  list-style: none;
}

.root:nth-child(3n + 3) {
  margin-right: 0;
}

.pic {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 100%;
}

.name {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 15px;
  letter-spacing: 0.1em;
}
</style>
