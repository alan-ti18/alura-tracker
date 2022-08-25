<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa deseja iniciar?"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option disabled>Selecione o projeto</option>
            <option
              v-for="projeto in projetos"
              :value="projeto.id"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <TemporizadorTracker @aoTemporizadorFinalizado="salvarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { key } from "@/store";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import TemporizadorTracker from "./TemporizadorTracker.vue";

export default defineComponent({
  name: "FormularioTracker",
  components: {
    TemporizadorTracker,
  },
  data() {
    return {
      descricao: "",
      idProjeto: "",
    };
  },
  emits: ["aoSalvarTarefa"],
  methods: {
    salvarTarefa(tempoEmSegundos: number): void {
      this.$emit("aoSalvarTarefa", {
        duracaoEmSegundos: tempoEmSegundos,
        descricao: this.descricao,
        projeto: this.projetos.find((projeto) => projeto.id == this.idProjeto),
      });
      this.descricao = "";
    },
  },
  setup() {
    const store = useStore(key);
    return {
      projetos: computed(() => store.state.projetos),
    };
  },
});
</script>

<style scoped>
.formulario {
  color: var(--text-primario);
  background-color: var(--bg-primario);
}
</style>