<template>
  <FormularioTracker @aoSalvarTarefa="salvarTarefa" />
  <div class="lista" v-if="tarefas.length > 0">
    <ListaTarefas v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
  </div>
  <div v-else>
    <p class="naohatarefas">Não há tarefas cadastradas.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormularioTracker from '@/components/FormularioTracker.vue';
import ListaTarefas from '@/components/ListaTarefas.vue';
// import { useStore } from 'vuex';
import ITarefa from '@/interfaces/ITarefa';

export default defineComponent({
  name: 'App',
  components: {
    FormularioTracker,
    ListaTarefas
  },
  data() {
    return {
      tarefas: [] as ITarefa[]
    }
  },

  methods: {
    salvarTarefa(tarefa: ITarefa) {
      tarefa.id = new Date()
        .toISOString()
        .substring(0,19)
        .replaceAll('-','')
        .replaceAll(':','')
        .replace('T','');
      this.tarefas.push(tarefa);
    }
  }
})
</script>

<style scoped>
  .naohatarefas {
    margin: 40px;
  }
</style>
