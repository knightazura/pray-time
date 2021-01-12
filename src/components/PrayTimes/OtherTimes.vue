<template>
  <div class="grid grid-rows-7 gap-4 h-full">
    <div class="flex items-center justify-center" v-for="i in 7" :key="i">
      <div :class="[
        'line mx-2 w-16 bg-yellow-800 rounded-full',
        i === 4 ? 'h-2' : 'h-1'
      ].join(' ')">&nbsp;</div>
      <div class="time-text mx-2 cursor-pointer">Waktu</div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';

import { setPrayTimes } from '../../lib/data/pray-time';

export default {
  setup() {
    onMounted(() => {
      const timeTexts = document.querySelectorAll('.time-text');
      for(let i = 0; i < timeTexts.length; i++) {
        if (i < 3) {
          let opacity = (i * 25) + 25;
          
          timeTexts[i].classList.add('text-white');
          timeTexts[i].classList.add('hover:text-opacity-100');
          timeTexts[i].classList.add(`text-opacity-${opacity}`);
        } else if (i > 3) {
          let opacity = 100 - (((i % 4) * 25) + 25);
          
          timeTexts[i].classList.add('text-yellow-800');
          timeTexts[i].classList.add('hover:text-opacity-100');
          timeTexts[i].classList.add(`text-opacity-${opacity}`);
        } else {
          timeTexts[i].classList.replace('cursor-pointer', 'cursor-default');
          timeTexts[i].classList.add('text-white');
          timeTexts[i].classList.add('text-opacity-0');
        }
      }
    });
  }
}
</script>
