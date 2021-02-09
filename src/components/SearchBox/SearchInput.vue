<template>
  <input
    v-if="!selected"
    id="place-input"
    class="mt-4 p-4 w-full bg-white border border-gray-200 rounded shadow outline-none transition-shadow duration-300 focus:shadow-lg"
    type="text"
    placeholder="Please write your living place (City)"
    v-model="find">
  <div class="text-2xl text-center" v-else>
    <span class="italic font-bold cursor-pointer underline-dotted" @click="resetSearch(true)">{{ selected }}</span>
  </div>
</template>

<script>
// Modules
import { toRefs, watch } from 'vue';

// Local modules
import debounce from '../../lib/debounce';
import { searchCity } from '../../services/geolocation';
import { places } from '../../lib/data/places';

export default {
  setup() {
    // Init
    const { find, selected, searchResult } = toRefs(places);

    // Input watchers
    watch(find, debounce(async function(keyword) {
      if (!keyword) {
        resetSearch();
      } else if(!!selected) {
        let result = await searchCity(keyword);
        searchResult.value = Array.from(result);
      }
    }, 500));

    // Reset search method
    const resetSearch = (changed = false) => {
      find.value = changed ? selected.value : '';
      searchResult.value = changed ?? [];
      selected.value = '';
    };

    return {
      find,
      selected,
      resetSearch
    }
  }
}
</script>