<template>
  <div v-if="places.length > 0" id="search-result" class="flex flex-col mt-4 w-1/2 bg-white border border-gray-200 rounded shadow">
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
import { computed, toRefs } from 'vue';
import { useStore } from 'vuex';

// Local modules & data
import { prayTimesByCity } from '../../services/pray-times';
import { places } from '../../store/places';

export default {
  setup() {
    // Init
    const store = useStore();
    const { selected, searchResult } = toRefs(places);

    // Search pray times
    const searchPrayTimes = async function(place) {
      let result = await prayTimesByCity(place);

      selected.value = place.city;
      searchResult.value.length = 0;
    }

    return {
      places: searchResult,
      searchPrayTimes
    }
  }
}
</script>

<style>

</style>