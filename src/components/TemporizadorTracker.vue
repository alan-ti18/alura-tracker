<template>
  <div class="is-flex is-align-items-center is-justify-content-space-around">
    <CronometroTracker :tempoEmSegundos="tempoEmSegundos" />
    <button class="button" @click.prevent="iniciar" :disabled="cronometroRodando">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button>
    <button class="button" @click.prevent="finalizar" :disabled="!cronometroRodando">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>stop</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CronometroTracker from "./CronometroTracker.vue";

export default defineComponent({
  name: 'TemporizadorTracker',
  components: {
    CronometroTracker
  },
  data() {
    return {
      cronometro: 0,
      tempoEmSegundos: 0,
      cronometroRodando: false
    }
  },
  emits: [
    'aoTemporizadorFinalizado'
  ],
  methods: {
    iniciar(): void {
      this.cronometroRodando = true;
      this.cronometro = setInterval(() => {
        return this.tempoEmSegundos++
      }, 1000)
    },
    finalizar() {
      this.cronometroRodando = false;
      clearInterval(this.cronometro)
      this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
      this.tempoEmSegundos = 0;
    }
  }
})
</script>

<style>
</style>