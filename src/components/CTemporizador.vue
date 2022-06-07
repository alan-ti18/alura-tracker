<template>
    <div class="is-flex is-align-items-center is-justify-content-space-around">
        <CCronometro :tempoEmSegundos="tempoEmSegundos" />
        <CBotao @clicado="iniciar" icone="fas fa-play" texto="Iniciar" :desabilitado="cronometroRodando"/>
        <CBotao @clicado="finalizar" icone="fas fa-stop" texto="Concluir" :desabilitado="!cronometroRodando"/>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import CCronometro from './CCronometro.vue';
    import CBotao from './CBotao.vue';

    export default defineComponent({
        name: "CTemporizador",
        emits:['aoTemporizadorFinalizado'],
        components: {
            CCronometro,
            CBotao
        },
        data(){
            return {
                tempoEmSegundos: 0,
                cronometro: 0,
                cronometroRodando: false
            }
        },
        methods: {
            iniciar(){
                this.cronometro = setInterval(() => {
                    this.tempoEmSegundos++
                }, 1000);
                this.cronometroRodando = true;
            },
            finalizar(){
                this.cronometroRodando = false;
                clearInterval(this.cronometro)
                this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
                console.log(this.tempoEmSegundos)
                this.tempoEmSegundos = 0
            }
        }
    })
</script>