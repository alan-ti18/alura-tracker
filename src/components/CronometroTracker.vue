<template>
  <section>
    <slot></slot>
    <strong class="crono">{{ tempoDecorrido }}</strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
  name: "CronometroTracker",
  data() {
    return {
    }
  },
  computed: {
    tempoDecorrido(): string {
      return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11, 8)
    }
  },
  props: {
    tempoEmSegundos: {
      type: Number,
      default: 0
    }
  }
})
</script>

<style scoped>
.crono {
  color: var(--text-primario);
}
</style>