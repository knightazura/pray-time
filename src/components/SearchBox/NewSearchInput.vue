<template>
  <div class="relative mt-4">
    <input
      v-model="find"
      type="text"
      class="search-city w-full absolute top-0 z-10 px-4 py-6 outline-none"
      placeholder="Find your city">
    <IconedButton @click="searchCity" />

    <div v-show="sr"
      class="search-results-wrapper absolute top-0 w-full z-0 search-city bg-white px-4"
      :style="`overflow: auto; max-height: ${maxHeightSearchResult}px`">
      <div v-for="r in searchResult" :key="r.city" class="py-4 search-results-item">
        {{ r.city }} - {{ r.country }}
      </div>
      <div class="py-4 search-results-item">
        Load more...
      </div>
    </div>
  </div>
</template>

<script>
// Modules
import { computed, ref, toRefs, onMounted } from 'vue';

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
    const maxHeightSearchResult = ref(0);

    onMounted(() => {
      let input = document.querySelector(".search-city");
      let fromTop = input.getBoundingClientRect().top;
      let inputHeight = input.getBoundingClientRect().height;
      maxHeightSearchResult.value = Math.floor(0.6 * (window.innerHeight - fromTop + inputHeight));
    })

    return {
      find,
      finding,
      searchResult,
      sr,
      maxHeightSearchResult
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
  border-radius: 16px;
  box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.08);
}

.search-results-wrapper {
  padding-top: 72px;
  overflow: hidden;
}
</style>