<template>
  <main class="px-16 2xl:px-0 py-32 max-w-screen-xl mx-auto">
    <p class="text-2xl">Pray times for you, a Moslem</p>
    <SearchBox />
  </main>
</template>

<script>
import Background from './components/Background.vue';
import SearchBox from './components/SearchBox/index.vue';

export default {
  name: 'App',
  components: {
    Background,
    SearchBox
  }
}
</script>
