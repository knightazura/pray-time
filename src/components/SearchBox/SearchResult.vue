<template>
  <div class="search-result-wrapper" :style="`max-height:${maxHeight}px`">
    <div v-for="place in places"
      @click="checkPrayTimes(place)"
      :key="place.city"
      class="search-results-item py-4 cursor-pointer hover:bg-gray-100">
      {{ place.city }} - {{ place.country }}
    </div>
    <div v-if="places.length < metadata.totalCount && finding.cities === 2"
      class="py-4 cursor-pointer hover:bg-gray-100"
      @click="loadMoreCities()">
      Load more
    </div>
  </div>
</template>

<script>
// Modules
import { toRefs } from 'vue';

// Local modules & data
import { searchCity } from '../../services/geolocation';
import { prayTimesByCity } from '../../services/pray-times';
import { places, findingStateMutator, searchResultMutator } from '../../lib/data/places';
import { setPrayTimes } from '../../lib/data/pray-time';

export default {
  props: ['maxHeight'],

  setup(props) {
    // Init
    const { selected, searchResult, find, finding, metadata } = toRefs(places);
    const { maxHeight } = toRefs(props);

    // Search pray times
    const checkPrayTimes = async function(place) {
      finding.value.prayTime = true;
      let result = await prayTimesByCity(place);

      if (result.length > 0) {
        setPrayTimes(result);

        selected.value = place.city;
        searchResultMutator.empty();

        finding.value.prayTime = false;
        
        // State for finding cities becomes IDLE
        findingStateMutator('cities').idle();
      }
    }

    // Load more cities
    const loadMoreCities = async function() {
      let offset = metadata.value.currentOffset + 1;
      let result = await searchCity(find.value, offset);

      searchResult.value = searchResult.value.concat(Array.from(result));
    }

    return {
      places: searchResult,
      checkPrayTimes,
      maxHeight,
      metadata,
      loadMoreCities,
      finding
    }
  }
}
</script>

<style>
.search-result-wrapper {
  @apply absolute w-full z-0 bg-white px-4;
  padding-top: 72px;
  border-radius: 16px;
  overflow: auto;
}
</style>