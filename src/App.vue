<template>
  <!-- New Design -->
  <main class="grid full-bleed-grid px-9 min-h-screen" style="background-color: #D1E1ED; grid-template-rows: max-content 1fr max-content">
    <h1 class="pt-10 md:pt-20" style="line-height: 150%;">
      Know your <br>
      <span class="font-black" style="color: #0099FF">pray times</span> for <br>
      <span class="font-black">today</span>
    </h1>
    <NewSearchInput />
    <div class="full-bleed credits mb-4">
      <div class="flex justify-center">
        <mzkLogo />
      </div>
      <p class="text-center mt-4">Developed by Muhammad Izzuddin Al Fikri</p>
    </div>
  </main>
</template>

<script>
// Components
import NewSearchInput from './components/SearchBox/NewSearchInput.vue';
import mzkLogo from './components/Elements/mzkLogo.vue';

export default {
  name: 'App',
  components: {
    NewSearchInput,
    mzkLogo
  },
}
</script>