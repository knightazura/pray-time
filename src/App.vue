<template>
  <main class="flex flex-col pt-24 items-center mx-auto max-w-screen-xl h-screen">
    <div v-if="!selected" class="flex flex-col items-center">
      <MainGraphic width="125" height="160" class="mb-8 transition-all duration-300" />
      <p class="transition-all duration-200 text-2xl">Pray times for you, a Moslem</p>
    </div>
    <div class="relative w-1/4">
      <SearchBox />
    </div>
    <div v-if="showPrayTime">
      <NextTime />
      <OtherTimes />
    </div>
  </main>
  <BottomWave />
</template>

<script>
import MainGraphic from './components/MainGraphic.vue';
import BottomWave from './components/BottomWave.vue';
import SearchBox from './components/SearchBox/index.vue';
import NextTime from './components/PrayTimes/NextTime.vue';
import OtherTimes from './components/PrayTimes/OtherTimes.vue';

import { prayTimes, nextActivePray } from './lib/data/pray-time';
import { places } from './lib/data/places';
import { computed, onDeactivated, onMounted, ref, toRefs, watch } from 'vue';

export default {
  name: 'App',
  components: {
    MainGraphic,
    BottomWave,
    SearchBox,
    NextTime,
    OtherTimes
  },

  setup() {
    const { selected } = toRefs(places);

    return {
      showPrayTime: computed(() => prayTimes.value.length > 0 && selected.value),
      nextActivePray,
      selected
    }
  }
}
</script>