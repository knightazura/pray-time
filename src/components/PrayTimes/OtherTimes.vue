<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 border rounded bg-white border-gray-200 shadow-lg">
    <OtherTimeItem v-for="(other, i) in nextOtherPrays"
      :prayData="other"
      :key="i"
      :class="borderRight(i)" />
  </div>
</template>

<script>
import OtherTimeItem from './OtherTimeItem.vue';
import { nextOtherPrays } from '../../lib/data/pray-time';

export default {
  components: { OtherTimeItem },

  setup() {
    const borderRight = (num) => num < nextOtherPrays.value.length - 1 ? 'md:border-r' : '';

    return {
      nextOtherPrays,
      borderRight
    }
  }
}
</script>
