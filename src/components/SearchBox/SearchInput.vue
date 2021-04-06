<template>
  <div class="relative mt-4">
    <input
      v-model="find"
      type="text"
      class="search-city"
      placeholder="Search your living place (city)" />
    <IconedButton @click="searchCity" />

    <SearchResult v-show="finding.cities === 2" :maxHeight="maxHeight" />
  </div>
</template>

<script>
// Modules
import { onMounted, ref, toRefs } from 'vue';

// Local modules
import { searchCity } from '../../services/geolocation';
import { places, findingStateMutator, searchResultMutator } from '../../lib/data/places';

// Components
import IconedButton from '../Elements/IconedButton.vue';
import SearchResult from './SearchResult.vue';

export default {
  components: {
    IconedButton,
    SearchResult
  },

  setup() {
    // Init
    const { find, finding, searchResult } = toRefs(places);
    const maxHeight = ref(0);

    // Handle resize
    const handleResize = function() {
      const searchInput = document.querySelector("input.search-city");
      maxHeight.value = window.innerHeight - (searchInput.getBoundingClientRect().top + 128);
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
      maxHeight
    }
  },

  methods: {
    // API calls to find city
    async searchCity() {
      // Loader for cities is ACTIVE
      findingStateMutator('cities').finding();

      if (this.finding.cities === 1) {
        // API calls find cities
        try {
          let result = await searchCity(this.find);
          
          if (result) {
            findingStateMutator('cities').success();
            searchResultMutator.set(result);
          }
        } catch (error) {
          findingStateMutator('cities').failed();
          console.error({error});
        }
      } else {
        findingStateMutator('cities').idle();
        searchResultMutator.empty();
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
</style>