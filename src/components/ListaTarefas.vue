<template>
  <BoxCard>
    <div class="columns">
      <div class="column is-6 desc">{{ descricaoFormatada || 'Tarefa sem Descrição' }}</div>
      <div class="column is-4 desc">[{{ tarefa.projeto?.nome ||  'N/D' }}]</div>
      <div class="column crono-wrapper">
        <CronometroTracker :tempoEmSegundos="tarefa.duracaoEmSegundos">
        <ClockTimeEightOutlineIcon :size="16" style="margin-right: 8px;"/>
        </CronometroTracker>
      </div>
    </div>
  </BoxCard>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CronometroTracker from "./CronometroTracker.vue";
import ITarefa from '@/interfaces/ITarefa'
import BoxCard from "./BoxCard.vue";
import ClockTimeEightOutlineIcon from 'vue-material-design-icons/ClockTimeEightOutline.vue';
import { useStore } from "vuex";

export default defineComponent({
  name: "ListaTarefas",
  components: {
    CronometroTracker,
    BoxCard,
    ClockTimeEightOutlineIcon
  },
  setup() {
    const store = useStore()
    return {
      store
    }
  },
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true
    }
  },
  computed: {
    descricaoFormatada() {
      let formatDesc: string = this.tarefa.descricao;
      if(formatDesc.length > 70) {
        const recorteDescricao = this.tarefa.descricao.substring(0, 70)
        formatDesc = `${recorteDescricao}...`
      }
      return formatDesc;
    }
  }
})
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

.crono-wrapper section .clock-time-eight-outline-icon{
  padding-top: 4px;
}
</style>