<template>
  <p :class="`font-bold ${fontSize}`">{{ formattedText }}</p>
</template>

<script>
import { computed } from 'vue'
export default {
  props: {
    category: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  },

  setup(props) {
    return {
      formattedText: computed(() => props.time.split(" ")[0]),
      fontSize: computed(() => props.category === 'next' ? 'text-9xl' : 'text-4xl')
    }
  }
}
</script>