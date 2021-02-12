<template>
  <!-- New Design -->
  <main class="grid grid-cols-1 px-9 h-screen main-wrapper" style="background-color: #D1E1ED; grid-template-rows: max-content 1fr max-content">
    <h1 class="home-title" style="line-height: 150%; padding-top: 80px;">
      Know your <br>
      <span class="font-black" style="color: #0099FF">pray times</span> for <br>
      <span class="font-black">today</span>
    </h1>
    <NewSearchInput />
    <div class="credits place-self-end justify-self-center flex flex-col mb-4">
      <p class="mt-6 text-center text-sm">Developed by Muhammad Izzuddin Al Fikri</p>
    </div>
  </main>
</template>

<script>
// Modules
import { computed, toRefs } from 'vue';

// Local modules
import { prayTimes, nextActivePray } from './lib/data/pray-time';
import { places } from './lib/data/places';

// Components
import NewSearchInput from './components/SearchBox/NewSearchInput.vue';
import mzkLogo from './components/Elements/mzkLogo.vue';

export default {
  name: 'App',
  components: {
    NewSearchInput,
    mzkLogo
  },
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
</style>