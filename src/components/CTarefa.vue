<template>
    <CBox>
        <div class="columns">
            <div class="column is-7">
                {{ tarefa.descricao || "Tarefa sem descrição"}}
            </div>
            <div class="column">
                <CCronometro :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
            </div>
        </div>
    </CBox>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import CCronometro from './CCronometro.vue';
    import CBox from './CBox.vue';
    import ITarefa from '../interfaces/ITarefa';

    export default defineComponent({
        name: 'CTarefa',
        components: {
            CCronometro,
            CBox
        },
        props: {
            tarefa: {
                type: Object as PropType<ITarefa>,
                required: true
            }
        }
    })
</script>

