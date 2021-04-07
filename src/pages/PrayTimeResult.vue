<template>
  <h1 class="selected-city text-center mt-8">{{ selected }}</h1>

  <!-- Active Pray Time 3D Widget -->
  <div class="active-pray-time p-8 mt-4 relative" style="background-color: #0099FF; border-radius: 16px; box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);">
    <div class="pray-icon" style="padding-top: 12px; position: absolute; top: 32px; right: 32px;">
      <component :is="nextActivePray.icon" class="mx-auto"></component>
    </div>
    <p class="pray-name text-white" style="font-size: 24px; text-shadow: -4px 4px 8px rgba(0, 0, 0, 0.25);">Next is {{ nextActivePray.name }}</p>
    <p class="text-sm text-white" style="color: #C5E8FF; text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);">in 01 hour and 37 minutes</p>
    <p class="time text-6xl text-white pt-4" style="text-shadow: -12px 16px 24px rgba(0, 0, 0, 0.45);">{{ nextActivePray.time }}</p>
  </div>
  
  <!-- Next time -->
  <div class="full-bleed next-time mt-9">
    <ol>
      <li v-for="(np, i) in nextOtherPrays" :key="i">
        <div class="px-9 flex items-center next-prays">
          <div class="pray-icon" :class="np.name === 'Isha' ? 'pt-2' : 'pt-3'">
            <component :is="np.icon" class="mx-auto"></component>
          </div>
          <div class="flex flex-col ml-4">
            <span class="text-sm">{{ np.name }}</span>
            <span class="text-2xl font-bold">{{ np.time }}</span>
          </div>
        </div>
      </li>
    </ol>
    <div class="flex mt-8 mb-4 mx-4 p-2 rounded-2xl bg-white border-main items-center">
      <div class="flex-grow p-4 rounded-lg text-shad text-white font-bold bg-gradient-to-b from-action to-action-end border border-white border-opacity-40" style="text-shadow: -4px 8px 8px rgba(0, 0, 0, 0.08);">
        <fa icon="arrow-down" size="lg" class="mr-3"></fa> Save for next time
      </div>
      <div class="flex-shrink">
        <fa icon="search" size="lg" class="mx-4"></fa>
      </div>
    </div>
  </div>
</template>

<script>
// Modules
import { toRefs } from 'vue';

// Local modules
import { nextActivePray, nextOtherPrays } from '../lib/data/pray-time';
import { places } from '../lib/data/places';

// Components
import FajrIcon from '../components/Elements/PrayIcons/Fajr.vue';
import DhuhrIcon from '../components/Elements/PrayIcons/Dhuhr.vue';
import AsrIcon from '../components/Elements/PrayIcons/Asr.vue';
import MaghribIcon from '../components/Elements/PrayIcons/Maghrib.vue';
import IshaIcon from '../components/Elements/PrayIcons/Isha.vue';

export default {
  name: 'PrayTimeResult',
  
  components: {
    FajrIcon,
    DhuhrIcon,
    AsrIcon,
    MaghribIcon,
    IshaIcon
  },

  setup() {
    const { selected } = toRefs(places);

    return {
      selected,
      nextActivePray,
      nextOtherPrays,
    }
  }
}
</script>

<style scoped>
.pray-icon {
  width: 48px;
  height: 48px;
  background: radial-gradient(63.54% 63.54% at 75% 9.38%, #FFE0B3 0%, #FBB54B 100%);
  box-shadow: -12px 16px 24px rgba(0, 0, 0, 0.16), inset 0px 2px 4px rgba(255, 255, 255, 0.16);
  border-radius: 64px;
}

.next-time {
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.4) 100%);
  border: 1px solid rgba(75, 108, 132, 0.16);
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.08);
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
}

ol > li {
  border-bottom: 1px solid rgba(209, 225, 237, 0.4);
}

ol > li > .next-prays {
  padding-top: 16px;
  padding-bottom: 16px;
}

ol > li:last-child {
  border-bottom: none;
}
</style>