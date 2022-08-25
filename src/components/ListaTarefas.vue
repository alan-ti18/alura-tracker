<template>
  <BoxCard>
    <div class="columns" @click="emitirTarefaSelecionada">
      <div class="column is-6 desc">
        {{ descricaoFormatada || "Tarefa sem Descrição" }}
      </div>
      <div class="column is-3 desc">[{{ tarefa.projeto?.nome || "N/D" }}]</div>
      <div class="column is-2 crono-wrapper">
        <CronometroTracker :tempoEmSegundos="tarefa.duracaoEmSegundos">
          <ClockTimeEightOutlineIcon :size="16" style="margin-right: 8px" />
        </CronometroTracker>
      </div>
      <div
        class="column is-1 btn-close-wrapper"
        @click="excluirTarefa(tarefa.id)"
      >
        <i class="fa-regular fa-circle-xmark btn-close"></i>
      </div>
    </div>
  </BoxCard>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import CronometroTracker from "./CronometroTracker.vue";
import ITarefa from "@/interfaces/ITarefa";
import BoxCard from "./BoxCard.vue";
import ClockTimeEightOutlineIcon from "vue-material-design-icons/ClockTimeEightOutline.vue";
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
  name: "ListaTarefas",
  emits: ["aoTarefaSelecionada"],
  components: {
    CronometroTracker,
    BoxCard,
    ClockTimeEightOutlineIcon,
  },
  setup() {
    const store = useStore(key);
    return {
      store,
      tarefas: computed(() => store.state.tarefas),
    };
  },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    },
  },
  methods: {
    excluirTarefa(id: number): void {
      this.store.commit("EXCLUI_TAREFA", id);
    },
    emitirTarefaSelecionada(): void {
      this.$emit("aoTarefaSelecionada", this.tarefa);
    },
  },
  computed: {
    descricaoFormatada() {
      let formatDesc: string = this.tarefa.descricao;
      if (formatDesc.length > 70) {
        const recorteDescricao = this.tarefa.descricao.substring(0, 70);
        formatDesc = `${recorteDescricao}...`;
      }
      return formatDesc;
    },
  },
});
</script>

<style scoped>
.box {
  background: #faf0ca;
  margin: 20px;
}

.desc {
  color: var(--text-primario);
}

.crono-wrapper section {
  display: flex;
  justify-content: center;
}

.crono-wrapper section .clock-time-eight-outline-icon {
  padding-top: 4px;
}

.btn-close-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.btn-close {
  cursor: pointer;
  padding: 0 8px;
}

.btn-close:hover {
  color: rgb(160, 0, 0);
}
</style>