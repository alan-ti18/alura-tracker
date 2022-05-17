<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateral />
    </div>
    <div class="column is-three-quarters">
      <FormularioComp />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import FormularioComp from './components/FormularioComp.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    FormularioComp
  }
});
</script>

<style>

</style>
