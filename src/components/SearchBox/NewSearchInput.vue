<template>
  <div class="relative mt-4">
    <input type="text" class="search-city w-full px-4 py-6 outline-none" placeholder="Search your living place (city)">
    <IconedButton />
  </div>
</template>

<script>
import IconedButton from '../Elements/IconedButton.vue';

export default {
  components: {
    IconedButton
  }
}
</script>

<style>
.search-city {
  border-radius: 16px;
  box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.08);
}
</style>