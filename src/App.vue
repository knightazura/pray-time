<template>
  <main class="flex flex-col pt-24 items-center mx-auto max-w-screen-xl h-screen">
    <MainGraphic v-if="!selected" width="125" height="160" class="mb-8 transition-all duration-300" />
    <p class="transition-all duration-200 text-2xl">Pray times for you, a Moslem</p>
    <div class="relative w-1/4">
      <SearchBox />
    </div> 
  </main>
  <BottomWave />
</template>

<script>
import MainGraphic from './components/MainGraphic.vue';
import BottomWave from './components/BottomWave.vue';
import SearchBox from './components/SearchBox/index.vue';

import { prayTimes } from './lib/data/pray-time';
import { places } from './lib/data/places';
import { computed, onDeactivated, onMounted, ref, toRefs, watch } from 'vue';

export default {
  name: 'App',
  components: {
    MainGraphic,
    BottomWave,
    SearchBox
  },

  setup() {
    const { selected } = toRefs(places);

    return {
      showPrayTime: computed(() => prayTimes.value.length > 0),
      selected
    }
  }
}
</script>