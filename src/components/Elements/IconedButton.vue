<template>
  <button class="iconed-button absolute p-4 z-20">
    <fa v-if="buttonState === 1" icon="search" class="text-white mx-1" />
    <fa v-if="buttonState === 0" icon="times" class="text-white mx-1" />
  </button>
</template>

<script>
import { toRefs, computed } from 'vue';
import { places } from '../../lib/data/places';

export default {
  setup() {
    const { searchResult } = toRefs(places);
    
    return {
      buttonState: computed(() => searchResult.value.length > 0 ? 0 : 1)
    }
  }
}
</script>

<style>
.iconed-button {
  background: linear-gradient(180deg, #0099FF 0%, #0075FF 100%);
  box-shadow: 0px 1px 16px 0px rgba(136, 112, 112, 0.24);
  border-radius: 8px;
  top: 8px;
  right: 8px;
}
</style>