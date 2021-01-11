<template>
  <div class="search-box flex flex-col">
    <SearchInput />
    <SearchResult />
  </div>
</template>

<script>
// Components
import SearchInput from './SearchInput.vue';
import SearchResult from './SearchResult.vue';

export default {
  components: {
    SearchInput,
    SearchResult
  },
}
</script>

<style>

</style>