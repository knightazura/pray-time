import { reactive } from "vue";

export const places = reactive({
  find: '',
  finding: {
    /**
     * Decimal - Bits = STATE
     * 0 - 00 = IDLE;
     * 1 - 01 = FINDING;
     * 2 - 10 = SUCCESS;
     * 3 - 11 = FAILED;
     */
    cities: 0,
    prayTime: false
  },
  searchResult: [],
  selected: '',
  metadata: {
    currentOffset: 0,
    totalCount: 0
  }
});