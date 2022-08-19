<template>
  <header>
    <h1>
      <img src="@/assets/logo.png" alt="logo">
    </h1>
    <button @click="mudarModoCor" class="button" :style="modoEscuro ? estiloClaro : estiloEscuro">{{ textoBotaoModoCor
    }}</button>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks"></i>tarefas
          </router-link>
        </li>
        <li>
          <router-link to="projetos" class="link">
            <i class="fas fa-project-diagram"></i>projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: 'BarraLateral',
  data() {
    return {
      modoEscuro: false,
      estiloClaro: {
        backgroundColor: '#fff',
        color: '#222'
      },
      estiloEscuro: {
        backgroundColor: '#2B2D42',
        color: '#eee'
      }
    }
  },
  emits: ['aoMudarModoCor'],
  computed: {
    textoBotaoModoCor() {
      if (!this.modoEscuro) {
        return 'Modo Escuro';

      } else {
        return 'Modo Claro';
      }
    }
  },
  methods: {
    mudarModoCor() {
      this.modoEscuro = !this.modoEscuro;
      this.$emit('aoMudarModoCor', this.modoEscuro)
    }
  }
})
</script>

<style scoped>
header {
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  padding: 1rem;
  text-align: center;
}

.panel li {
  margin: 8px 0;
}

.link {
  color: #fff;
}

.link:hover {
  color: #FAF0CA;
}

.link.router-link-active {
  color: #FAF0CA;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>