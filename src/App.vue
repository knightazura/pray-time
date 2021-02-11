<template>
  <div class="hidden">
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
  </div>

  <!-- New Design -->
  <main class="grid grid-cols-1 px-9 h-screen" style="background-color: #D1E1ED; grid-template-rows: max-content 1fr max-content">
    <h1 style="line-height: 150%; padding-top: 80px;">
      Know your <br>
      <span class="font-black" style="color: #0099FF">pray times</span> for <br>
      <span class="font-black">today</span>
    </h1>
    <NewSearchInput />
    <div class="credits place-self-end flex flex-col mb-8">
      <mzkLogo />
      <p class="mt-6">Developed by Muhammad Izzuddin Al Fikri</p>
    </div>
  </main>
</template>

<script>
import MainGraphic from './components/MainGraphic.vue';
import BottomWave from './components/BottomWave.vue';
import SearchBox from './components/SearchBox/index.vue';
import NextTime from './components/PrayTimes/NextTime.vue';
import OtherTimes from './components/PrayTimes/OtherTimes.vue';

import NewSearchInput from './components/SearchBox/NewSearchInput.vue';
import mzkLogo from './components/Elements/mzkLogo.vue';

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
    OtherTimes,

    NewSearchInput,
    mzkLogo
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