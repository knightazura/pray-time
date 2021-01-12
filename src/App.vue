<template>
  <main class="grid grid-cols-2 px-16 2xl:px-0 max-w-screen-2xl mx-auto h-screen bg-yellow-200">
    <div class="left py-32">
      <p class="text-2xl">Pray times for you, a Moslem</p>
      <SearchBox />

      <NextPrayTime v-if="showPrayTime" />

      <div class="project-details mt-16">
        <div class="button-group flex">
          <button class="rounded-full bg-white px-6 py-2 hover:shadow-lg transition-shadow duration-200">Share to others</button>
          <button class="rounded-full bg-transparent border-2 hover:shadow-lg transition-shadow duration-200 border-yellow-700 px-6 py-2 ml-4">Project details</button>
        </div>
        <div class="social-media mt-12 text-lg">
          <fa class="mr-8" size="lg" :icon="['fab', 'github']" />
          <fa class="mr-8" size="lg" :icon="['fab', 'twitter']" />
          <fa class="mr-8" size="lg" :icon="['fab', 'instagram']" />
        </div>
      </div>
    </div>

    <div class="right">
      <OtherPrayTimes v-if="showPrayTime" />
    </div>
  </main>
</template>

<script>
import Background from './components/Background.vue';
import SearchBox from './components/SearchBox/index.vue';
import NextPrayTime from './components/PrayTimes/NextTime.vue';
import OtherPrayTimes from './components/PrayTimes/OtherTimes.vue';

import { prayTimes } from './lib/data/pray-time';
import { computed } from 'vue';

export default {
  name: 'App',
  components: {
    Background,
    SearchBox,
    NextPrayTime,
    OtherPrayTimes
  },

  setup() {
    return {
      showPrayTime: computed(() => prayTimes.value.length > 0)
    }
  }
}
</script>
