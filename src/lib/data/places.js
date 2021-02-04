import { reactive } from "vue";

export const places = reactive({
  find: '',
  searchResult: [],
  selected: '',
  metadata: {
    currentOffset: 0,
    totalCount: 0
  }
});