<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
            </div>
            <div class="column">
                <CTemporizador @aoTemporizadorFinalizado="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import CTemporizador from "./CTemporizador.vue";

    export default defineComponent({
        name: 'CFormulario',
        components: {
            CTemporizador
        },
        emits: ['aoSalvarTarefa'],
        data () {
            return {
               descricao: ''
            }
        },
        methods: {
            finalizarTarefa (tempoDecorrido: number) : void {
                this.$emit('aoSalvarTarefa', {
                    duracaoEmSegundos: tempoDecorrido,
                    descricao: this.descricao
                })
                this.descricao = '';
            }
        }
    })
</script>


<style scoped>

</style>