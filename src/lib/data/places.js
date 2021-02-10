import { reactive } from "vue";

export const places = reactive({
  find: '',
  finding: {
    cities: false,
    prayTime: false
  },
  searchResult: [],
  selected: '',
  metadata: {
    currentOffset: 0,
    totalCount: 0
  }
});