<template>
  <div v-if="places.length > 0 && showPlaceResult" id="search-result" class="flex flex-col mt-4 w-1/2 bg-white border border-gray-200 rounded shadow">
    <ol>
      <li v-for="(place, i) in places"
        :key="place.id"
        :class="[
          'p-4 cursor-pointer hover:bg-gray-100',
          i === places.length - 1 ? '' : 'border-b border-gray-300'
        ].join(' ')"
        @click="searchPrayTimes(place)">{{ place.city }} - {{ place.country }}</li>
    </ol>
  </div>
</template>

<script>
// Modules
import { computed } from 'vue';
import { useStore } from 'vuex';

// Local modules & data
import { prayTimesByCity } from '../../services/pray-times';
import { selectedCity } from '../../store/places';

export default {
  setup() {
    // Init
    const store = useStore();

    // Search pray times
    const searchPrayTimes = async function(place) {
      let result = await prayTimesByCity(place);

      store.commit('TOGGLE_PLACE_RESULT');

      store.commit('SET_PRAY_TIMES', {
        prayTimes: result,
        selectedPlace: place.city
      });
    }

    return {
      places: computed(() => store.getters.places),
      showPlaceResult: computed(() => store.getters.showPlaceResult),
      searchPrayTimes
    }
  }
}
</script>

<style>

</style>