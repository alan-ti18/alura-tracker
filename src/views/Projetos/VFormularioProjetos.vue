<template>
  <section>
    <form @submit.prevent="salvarProjeto">
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
        <router-link class="button btn-cancelar" to="/projetos"
          >Cancelar</router-link
        >
      </div>
      <div class="field"></div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/tipo-acoes";

export default defineComponent({
  name: "VFormularioProjetos",
  data() {
    return {
      nomeDoProjeto: "",
    };
  },
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(
        (proj) => proj.id == this.id
      );
      this.nomeDoProjeto = projeto?.nome || "";
    }
  },
  methods: {
    salvarProjeto() {
      if (this.id) {
        this.store
          .dispatch(ALTERAR_PROJETO, {
            id: this.id,
            nome: this.nomeDoProjeto,
          })
          .then(() => {
            this.nomeDoProjeto = "";
            this.notificar(
              TipoNotificacao.SUCESSO,
              "projeto editado com sucesso",
              "Seu projeto já está renomeado."
            );
            this.$router.push("/projetos");
          })
          .catch(() => {
            this.notificar(
              TipoNotificacao.FALHA,
              "Que pena!",
              "Algo deu errado durante a edição do projeto"
            );
          });
      } else {
        this.store
          .dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
          .then(() => {
            this.nomeDoProjeto = "";
            this.notificar(
              TipoNotificacao.SUCESSO,
              "projeto salvo com sucesso",
              "Prontinho! Seu projeto já está disponível."
            );
            this.$router.push("/projetos");
          })
          .catch(() => {
            this.notificar(
              TipoNotificacao.FALHA,
              "Que pena!",
              "Algo deu errado durante o cadastro do projeto"
            );
          });
      }
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    return {
      store,
      notificar,
    };
  },
});
</script>

<style scoped>
.btn-cancelar {
  margin-left: 16px;
  border: none;
  color: rgb(170, 0, 0);
}
</style>