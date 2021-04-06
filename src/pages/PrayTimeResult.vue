<template>
  <div class="grid min-h-screen" style="background-color: #D1E1ED; grid-template-rows: max-content max-content 1fr">
    <h1 class="selected-city text-center mt-12">Jakarta</h1>

    <!-- Active Pray Time 3D Widget -->
    <div class="active-pray-time mx-9 p-8 mt-4 relative" style="background-color: #0099FF; border-radius: 16px; box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);">
      <div class="pray-icon" style="padding-top: 12px; position: absolute; top: 32px; right: 32px;">
        <ashr-icon class="mx-auto"></ashr-icon>
      </div>
      <p class="pray-name text-white" style="font-size: 24px; text-shadow: -4px 4px 8px rgba(0, 0, 0, 0.25);">Next is Ashr</p>
      <p class="text-sm text-white" style="color: #C5E8FF; text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);">in 01 hour and 37 minutes</p>
      <p class="time text-6xl text-white pt-4" style="text-shadow: -12px 16px 24px rgba(0, 0, 0, 0.45);">15.32</p>
    </div>
    
    <!-- Next time -->
    <div class="next-time w-full mt-9" style="background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.4) 100%); border: 1px solid rgba(75, 108, 132, 0.16); box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.08);">
      <ol>
        <li v-for="(np, i) in nextPrays" :key="i">
          <div class="px-9 flex items-center next-prays">
            <div class="pray-icon" style="padding-top: 12px;">
              <component :is="np.icon" class="mx-auto"></component>
            </div>
            <div class="flex flex-col ml-4">
              <span class="text-sm">{{ np.name }}</span>
              <span class="text-2xl">{{ np.time }}</span>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
// Modules
import { computed, toRefs } from 'vue';

// Local modules
import { prayTimes, nextActivePray } from '../lib/data/pray-time';
import { places } from '../lib/data/places';

// Components
import FajrIcon from '../components/Elements/PrayIcons/Fajr.vue';
import DhuhurIcon from '../components/Elements/PrayIcons/Dhuhur.vue';
import AshrIcon from '../components/Elements/PrayIcons/Ashr.vue';
import MaghribIcon from '../components/Elements/PrayIcons/Maghrib.vue';
import IshaIcon from '../components/Elements/PrayIcons/Isha.vue';

export default {
  name: 'PrayTimeResult',
  
  components: {
    FajrIcon,
    DhuhurIcon,
    AshrIcon,
    MaghribIcon,
    IshaIcon
  },

  setup() {
    const nextPrays = [
      { name: 'Maghrib', time: '18.21', icon: 'maghrib-icon' },
      { name: 'Isha', time: '19.13', icon: 'isha-icon' },
      { name: 'Fajr', time: '04.35', icon: 'fajr-icon' },
      { name: 'Dhuhur', time: '12.07', icon: 'dhuhur-icon' }
    ]

    return { nextPrays }
  }
}
</script>

<style scoped>
@media (max-width: 321px) {
  main.main-wrapper {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  h1.home-title {
    font-size: 1.5rem;
  }
}

.pray-icon {
  width: 48px;
  height: 48px;
  background: radial-gradient(63.54% 63.54% at 75% 9.38%, #FFE0B3 0%, #FBB54B 100%);
  box-shadow: -12px 16px 24px rgba(0, 0, 0, 0.35), inset 0px 2px 4px rgba(255, 255, 255, 0.25);
  border-radius: 64px;
}

.next-time {
  border-top-left-radius: 32px;
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