<template>
  <button class="iconed-button">
    <fa v-if="buttonState && finding.cities !== 1" icon="search" class="text-white mx-1" />
    <fa v-if="!buttonState && !finding.prayTime" icon="times" class="text-white mx-1" />
    <fa v-if="(!buttonState && finding.prayTime) || (buttonState && finding.cities === 1)" icon="spinner" class="animate-spin text-white mx-1" />
  </button>
</template>

<script>
import { toRefs, computed } from 'vue';
import { places } from '../../lib/data/places';

export default {
  setup() {
    const { finding, searchResult } = toRefs(places);
    
    return {
      buttonState: computed(() => searchResult.value.length > 0 ? 0 : 1),
      finding
    }
  }
}
</script>

<style>
.iconed-button {
  @apply absolute p-4 z-20 bg-gradient-to-b from-primary to-primary-end;
  box-shadow: 0px 1px 16px 0px rgba(136, 112, 112, 0.24);
  border-radius: 8px;
  top: 8px;
  right: 8px;
}
</style>