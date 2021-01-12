import { ref } from "vue";

export const interv = function() {
  const timer = ref(10);

  setInterval(() => {
    if (timer.value === 0) {
      clearInterval(interv)
    } else {
      timer.value--
      console.log(timer.value)
    }
  }, 1000)

  return timer;
}