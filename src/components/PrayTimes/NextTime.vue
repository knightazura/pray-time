<template>
  <div class="mt-12 mb-10 text-center">
    <p class="text-xl mb-4">
      Next pray is <span class="font-bold">{{ nextActivePray.name }}</span> {{ countdown }}
    </p>
    <TimeText category="next" :time="nextActivePray.time" />
  </div>
</template>

<script>
import { computed } from 'vue';
import { nextActivePray, timer, prayNow } from '../../lib/data/pray-time';
import TimeText from './TimeText.vue';

export default {
  components: { TimeText },

  setup() {
    const countdown = computed(() => {
      let hw = '';
      let mw = '';

      let ht = Math.abs(timer.value.hours);
      let mt = Math.abs(timer.value.minutes);

      // Hour setup
      if (ht === 1) {
        hw = `${ht} hour`;
      } else if (ht > 1) {
        hw = `${ht} hours`;
      }

      // Minute setup
      if (mt === 1) {
        mw = `${mt} minute`;
      } else if (mt > 1) {
        mw = `${mt} minutes`;
      }

      let word = `about ${hw} and ${mw}`

      if (ht > 0 && mt === 0) {
        word = `about ${hw}`;
      } else if (ht === 0 && mt > 0) {
        word = `about ${mw}`;
      } else if (ht === 0 && mt === 0) {
        word = 'and please prepare yourself for pray now!';
      }

      return word;
    });

    const c = computed(() => timer.value.minutes);

    return {
      nextActivePray,
      countdown,
      timer,
      prayNow
    };
  }
}
</script>
