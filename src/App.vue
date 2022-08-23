<template>
  <main class="columns is-gapless is-multiline" :class="modoEscuro ? 'modo-escuro' : ''">
    <div class="column is-one-quarter">
      <BarraLateral @aoMudarModoCor="alternarModoCor" />
    </div>
    <div class="column is-three-quarters conteudo">
      <CNotificacoes />
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import CNotificacoes from './components/CNotificacoes.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    CNotificacoes
},
  data() {
    return {
      modoEscuro: false
    }
  },
  methods: {
    alternarModoCor(modoCor: boolean) {
      this.modoEscuro = modoCor;
    }
  }
})
</script>

<style scoped>
  main{
    --bg-primario: #fff;
    --text-primario: #222;
    --bg-tarefa: #faf0ca;
  }

  main.modo-escuro{
    --bg-primario: #2b2d42;
    --text-primario: #eee;
    --bg-tarefa: #c1b300;
  }

  .conteudo {
    background-color: var(--bg-primario);
    color: var(--text-primario);
  }
</style>
