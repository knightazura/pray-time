<template>
  <div class="relative mt-4">
    <input
      v-model="find"
      type="text"
      class="search-city"
      placeholder="Search your living place (city)" />
    <IconedButton @click="searchCity" />

    <div v-show="sr" class="search-results-wrapper" :style="`max-height: ${maxHeight}px`">
      <div v-for="r in searchResult" :key="r.city" class="py-4 search-results-item">
        {{ r.city }} - {{ r.country }}
      </div>
    </div>
  </div>
</template>

<script>
// Modules
import { onMounted, ref, toRefs } from 'vue';

// Local modules
import { searchCity } from '../../services/geolocation';
import { places } from '../../lib/data/places';

// Components
import IconedButton from '../Elements/IconedButton.vue';

export default {
  components: {
    IconedButton
  },

  setup() {
    // Init
    const { find, finding, searchResult } = toRefs(places);
    const sr = ref(false);
    const maxHeight = ref(0);

    // Handle resize
    const handleResize = function() {
      const srw = document.querySelector(".search-results-wrapper");
      maxHeight.value = window.innerHeight - (srw.parentNode.offsetTop + 64);
    }

    // Mounted
    onMounted(() => {
      window.addEventListener('resize', handleResize)
      handleResize()
    })

    return {
      find,
      finding,
      searchResult,
      sr,
      maxHeight
    }
  },

  methods: {
    // API calls to find city
    async searchCity() {
      // Loader for cities is ACTIVE
      this.finding.cities = true;

      if (!this.sr) {
        // API calls find cities
        try {
          let result = await searchCity(this.find);
          
          if (result) {
            this.sr = true
            this.searchResult = result;
          }        
        } catch (error) {
          console.error({error})
        }
      } else {
        this.sr = false
        this.searchResult = []
      }
    },
  }
}
</script>

<style>
.search-city {
  @apply w-full absolute top-0 z-10 px-4 py-6 outline-none;
  border-radius: 16px;
  box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.08);
}

.search-results-wrapper {
  @apply absolute w-full z-0 bg-white px-4;
  padding-top: 72px;
  border-radius: 16px;
  overflow: auto;
}
</style>