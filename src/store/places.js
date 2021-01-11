import { reactive, ref } from "vue";

export const cities = ref([]);
export const selectedCity = reactive({
  state: false,
  lastSearch: ''
});