import { reactive } from "vue";

export const places = reactive({
  find: '',
  finding: false,
  searchResult: [],
  selected: '',
  metadata: {
    currentOffset: 0,
    totalCount: 0
  }
});