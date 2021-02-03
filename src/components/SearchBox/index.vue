<template>
  <div class="search-box w-full absolute top-0 left-0">
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