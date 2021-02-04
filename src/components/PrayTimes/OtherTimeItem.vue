<template>
  <div class="flex flex-col items-center justify-center relative py-6 px-14" >
    <p class="px-2 py-1 rounded text-xs bg-blue-300 absolute top-4 right-4" title="Tomorrow" v-if="nextDay">+1</p>
    <p class="pray-name mb-4">{{ name }}</p>
    <TimeText category="other" :time="time" />
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import TimeText from './TimeText.vue';

interface PrayData {
  name: String,
  time: String,
  nextDay: Boolean
}

export default {
  props: {
    prayData: {
      type: Object as PropType<PrayData>,
      required: true
    }
  },

  components: { TimeText },

  setup(props) {
    const { name, time, nextDay } = props.prayData

    return {
      name,
      time,
      nextDay
    }
  }
}
</script>