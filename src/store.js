import { createStore } from "vuex";

const appState = createStore({
  state: {
    prayTimes: [],
    placeResult: {
      data: [],
      lastSearch: '',
      status: false
    }
  },

  getters: {
    availablePrayTimes (state) {
      return state.prayTimes;
    },
    showPlaceResult (state) {
      return state.placeResult.status;
    },
    places (state) {
      return state.placeResult.data;
    }
  },

  mutations: {
    SET_PRAY_TIMES(state, payload) {
      state.prayTimes.length = 0;
      state.prayTimes = payload.prayTimes;

      state.placeResult.data.length = 0;
      state.placeResult.lastSearch = payload.selectedPlace
    },
    PLACE_SEARCH_RESULT(state, places) {
      state.placeResult.data = places;
    },
    TOGGLE_PLACE_RESULT(state) {
      state.placeResult.status = !state.placeResult.status;
    }
  },
})

export default appState;