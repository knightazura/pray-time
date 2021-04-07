import { reactive } from "vue";

export const places = reactive({
  find: '',
  finding: {
    cities: 0,
    prayTime: false
  },
  searchResult: [],
  selected: null,
  saved: [],
  metadata: {
    currentOffset: 0,
    totalCount: 0
  }
});

export const searchResultMutator = {
  set: result => places.searchResult = result,
  empty: () => places.searchResult = []
}

export const findingStateMutator = prop => {
  /**
   * -----------------------------
   * Decimal - Bits = State
   * -----------------------------
   * 0       - 00   = IDLE;
   * 1       - 01   = FINDING;
   * 2       - 10   = SUCCESS;
   * 3       - 11   = FAILED;
   */
  return {
    idle: () => places.finding[prop] = places.finding[prop] >> 2,
    finding: () => places.finding[prop] = places.finding[prop] | 1,
    success: () => places.finding[prop] = places.finding[prop] << 1,
    failed: () => places.finding[prop] = places.finding[prop] | 2
  }
}