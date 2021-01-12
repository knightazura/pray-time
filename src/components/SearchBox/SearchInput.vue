<template>
  <input
    v-if="!selected"
    class="mt-4 p-4 bg-white border border-gray-200 rounded shadow outline-none transition-shadow duration-300 focus:shadow-lg"
    type="text"
    placeholder="Please write your living place (City)"
    style="width: 380px"
    v-model="find">
  <div class="text-2xl" v-else>
    in <span class="italic font-bold cursor-pointer underline-dotted" @click="resetSearch">{{ selected }}</span>
  </div>
</template>

<script>
// Modules
import { reactive, toRefs, watch } from 'vue';
import { useStore } from 'vuex';

// Local modules
import debounce from '../../lib/debounce';
import { searchCity } from '../../services/geolocation';
import { places } from '../../lib/data/places';

export default {
  setup() {
    // Init
    const store = useStore();

    const { find, selected, searchResult } = toRefs(places);

    // Input watchers
    watch(find, debounce(async function(keyword) {
      if(!!selected) {
        let result = await searchCity(keyword);

        searchResult.value = Array.from(result);
      }
    }, 250));

    // Reset search method
    const resetSearch = () => {
      find.value = selected.value;
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