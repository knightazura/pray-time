<template>
  <main class="flex flex-col pt-12 md:pt-24 items-center mx-auto max-w-screen-xl">
    <div v-if="!selected" class="flex flex-col items-center">
      <MainGraphic width="125" height="160" class="mb-8" />
      <p class="transition-all duration-200 text-2xl">Pray times for you, a Moslem</p>
    </div>
    <div class="relative w-full md:w-1/4">
      <div v-if="finding.prayTime" class="w-full text-center py-8 text-lg">Fetching prayer times...</div>
      <SearchBox :class="finding.prayTime ? 'hidden' : ''" />
    </div>
    <div class="px-8 md:px-0" v-if="showPrayTime">
      <NextTime />
      <OtherTimes />
    </div>
  </main>
  <BottomWave class="absolute bottom-0 left-0" />
</template>

<script>
import MainGraphic from './components/MainGraphic.vue';
import BottomWave from './components/BottomWave.vue';
import SearchBox from './components/SearchBox/index.vue';
import NextTime from './components/PrayTimes/NextTime.vue';
import OtherTimes from './components/PrayTimes/OtherTimes.vue';

import { prayTimes, nextActivePray } from './lib/data/pray-time';
import { places } from './lib/data/places';
import { computed, toRefs } from 'vue';

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
    const { selected, finding } = toRefs(places);

    return {
      showPrayTime: computed(() => prayTimes.value.length > 0 && selected.value),
      nextActivePray,
      selected,
      finding
    }
  }
}
</script>