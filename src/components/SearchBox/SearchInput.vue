<template>
  <input
    v-if="!selectedCity.state"
    class="mt-4 p-4 bg-white border border-gray-200 rounded shadow outline-none transition-shadow duration-300 focus:shadow-lg"
    type="text"
    placeholder="Please write your living place (City)"
    style="width: 380px"
    v-model="selectedCity.lastSearch">
  <div class="text-2xl" v-else>
    in <span class="italic font-bold cursor-pointer" @click="resetSearch">{{ selectedCity.lastSearch }}</span>
  </div>
</template>

<script>
// Modules
import { reactive, watch } from 'vue';
import { useStore } from 'vuex';

// Local modules
import debounce from '../../mixins/debounce';
import { searchCity } from '../../services/geolocation';
import { selectedCity } from '../../store/places';

export default {
  setup() {
    // Init
    const store = useStore();

    // Input watchers
    watch(selectedCity, debounce(async function(data) {
      if (!data.state) {
        let result = await searchCity(data.lastSearch);

        store.commit('TOGGLE_PLACE_RESULT');
        store.commit('PLACE_SEARCH_RESULT', result);
      }
    }, 250));

    // Reset search method
    const resetSearch = () => selectedCity.state = false;

    return {
      selectedCity,
      resetSearch
    }
  }
}
</script>