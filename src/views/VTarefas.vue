<template>
  <FormularioTracker @aoSalvarTarefa="salvarTarefa" />
  <div class="lista" v-if="tarefas.length > 0">
    <ListaTarefas
      @aoTarefaSelecionada="abrirEditorTarefa"
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
    />
  </div>
  <div v-else>
    <p class="naohatarefas">Não há tarefas cadastradas.</p>
  </div>
  <div
    class="modal"
    :class="{ 'is-active': tarefaSelecionada }"
    v-if="tarefaSelecionada"
  >
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Editar Tarefa</p>
        <button class="delete" aria-label="close" @click="fecharModal"></button>
      </header>
      <section class="modal-card-body">
        <form>
          <div class="field">
            <label for="tarefa" class="label">Descrição</label>
            <input
              type="text"
              class="input"
              v-model="tarefaSelecionada.descricao"
              id="tarefa"
            />
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="alterarTarefa">Salvar</button>
        <button class="button" @click="fecharModal">Cancelar</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import FormularioTracker from "@/components/FormularioTracker.vue";
import ListaTarefas from "@/components/ListaTarefas.vue";
import { useStore } from "vuex";
import ITarefa from "@/interfaces/ITarefa";
import { key } from "@/store";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "@/store/tipo-acoes";

export default defineComponent({
  name: "App",
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  components: {
    FormularioTracker,
    ListaTarefas,
  },
  setup() {
    const store = useStore(key);
    store.dispatch(OBTER_PROJETOS);
    store.dispatch(OBTER_TAREFAS);
    return {
      store,
      tarefas: computed(() => store.state.tarefas),
    };
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    abrirEditorTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    alterarTarefa() {
      this.store
        .dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    },
    fecharModal(): void {
      this.tarefaSelecionada = null;
    },
  },
});
</script>

<style scoped>
.naohatarefas {
  margin: 40px;
}
</style>