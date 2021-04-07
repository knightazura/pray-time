<template>
  <!-- New Design -->
  <h1 class="pt-10 md:pt-20" style="line-height: 150%;">
    Know your <br>
    <span class="font-black text-primary">pray times</span> for <br>
    <span class="font-black">today</span>
  </h1>
  <SearchInput />
  <div class="full-bleed credits mb-4">
    <div class="flex justify-center">
      <mzkLogo />
    </div>
    <p class="text-center mt-4">Developed by Muhammad Izzuddin Al Fikri</p>
  </div>
</template>

<script>
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
// Components
import SearchInput from '../components/SearchBox/SearchInput.vue';
import mzkLogo from '../components/Elements/mzkLogo.vue';
import { prayTimesByCity } from '../services/pray-times';
import { setPrayTimes } from '../lib/data/pray-time';
import { places, searchResultMutator } from '../lib/data/places';

export default {
  name: 'Home',
  components: {
    SearchInput,
    mzkLogo
  },

  setup() {
    const router = useRouter();
    const { finding, selected } = toRefs(places)

    return {
      finding,
      selected,
      router
    }
  },

  async mounted() {
    const savedPlace = localStorage.getItem("place")

    if (savedPlace) {
      let result = await prayTimesByCity(savedPlace);

      if (result.length > 0) {
        setPrayTimes(result);

        this.selected.value = savedPlace;
        searchResultMutator.empty();

        this.finding.value.prayTime = false;

        // Route to result page
        this.router.push(`/result/${savedPlace}`)
      }
    }
  }
}
</script>