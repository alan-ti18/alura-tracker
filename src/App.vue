<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <CBarraLateral />
    </div>
    <div class="column is-three-quarters">
      <CFormulario @aoSalvarTarefa="salvarTarefa"/>
      <div class="lista">
        <CTarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <CBox v-if="listaEstaVazia">
          Você não está muito produtivo hoje!
        </CBox>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CBarraLateral from './components/CBarraLateral.vue';
import CFormulario from './components/CFormulario.vue';
import CTarefa from './components/CTarefa.vue';
import CBox from './components/CBox.vue';
import ITarefa from './interfaces/ITarefa';

export default defineComponent({
  name: 'App',
  components: {
    CBarraLateral,
    CFormulario,
    CTarefa,
    CBox
  },
  data(){
    return {
      tarefas: [] as ITarefa[]
    }
  },
  computed: {
    listaEstaVazia () : boolean {
      return this.tarefas.length === 0;
    }
  },
  methods: {
    salvarTarefa (tarefa: ITarefa) {
      this.tarefas.push(tarefa)
    }
  }
});
</script>

<style>
    .lista {
        padding: 1.25rem;
    }
</style>
