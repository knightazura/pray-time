<template>
  <div v-if="places.length > 0"
    id="search-result"
    class="flex flex-col mt-4 bg-white border border-gray-200 rounded shadow"
    :style="`max-height: ${maxHeight}px`">
    <ol>
      <li v-for="(place, i) in places"
        :key="place.id"
        :class="[
          'p-4 cursor-pointer hover:bg-gray-100',
          i === places.length - 1 ? '' : 'border-b border-gray-300'
        ].join(' ')"
        @click="checkPrayTimes(place)">{{ place.city }} - {{ place.country }}</li>
    </ol>
  </div>
</template>

<script>
// Modules
import { onMounted, toRefs, ref } from 'vue';
import { useStore } from 'vuex';

// Local modules & data
import { prayTimesByCity } from '../../services/pray-times';
import { places } from '../../lib/data/places';
import { setPrayTimes } from '../../lib/data/pray-time';

export default {
  setup() {
    // Init
    const store = useStore();
    const { selected, searchResult } = toRefs(places);
    const maxHeight = ref(0);

    // Search pray times
    const checkPrayTimes = async function(place) {
      let result = await prayTimesByCity(place);

      if (result.length > 0) {
        setPrayTimes(result);

        selected.value = place.city;
        searchResult.value.length = 0;
      }
    }

    onMounted(() => {
      let placeInput = document.getElementById("place-input");
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      maxHeight.value = (window.innerHeight - (placeInput.getBoundingClientRect().top + scrollTop)) - 100;
    });

    return {
      places: searchResult,
      checkPrayTimes,
      maxHeight
    }
  }
}
</script>

<style>
#search-result {
  overflow: auto;
}
</style>