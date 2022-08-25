import { INotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import ITarefa from "@/interfaces/ITarefa";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {
  ALTERAR_PROJETO,
  ALTERAR_TAREFA,
  CADASTRAR_PROJETO,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
  REMOVER_PROJETO,
} from "./tipo-acoes";
import http from "@/http/index";

interface Estado {
  projetos: IProjeto[];
  tarefas: ITarefa[];
  notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projetos: [],
    tarefas: [],
    notificacoes: [],
  },
  mutations: {
    ADICIONA_PROJETO(state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date()
          .toISOString()
          .substring(0, 19)
          .replaceAll("-", "")
          .replaceAll(":", "")
          .replaceAll("T", ""),
        nome: nomeDoProjeto,
      } as IProjeto;
      state.projetos.push(projeto);
    },
    ALTERA_PROJETO(state, projeto: IProjeto) {
      const index = state.projetos.findIndex((proj) => proj.id == projeto.id);
      state.projetos[index] = projeto;
    },
    EXCLUI_PROJETO(state, id) {
      const index = state.projetos.findIndex((proj) => proj.id == id);
      state.projetos.splice(index, 1);
    },
    DEFINIR_PROJETOS(state, projetos: IProjeto[]) {
      state.projetos = projetos;
    },
    ADICIONA_TAREFA(state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    ALTERA_TAREFA(state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((tar) => tar.id == tarefa.id);
      state.tarefas[index] = tarefa;
    },
    EXCLUI_TAREFA(state, id: number) {
      const index = state.tarefas.findIndex((tar) => tar.id == id);
      state.tarefas.splice(index, 1);
    },
    DEFINIR_TAREFAS(state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    NOTIFICAR(state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notif) => notif.id != novaNotificacao.id
        );
      }, 3000);
    },
  },
  actions: {
    [OBTER_PROJETOS]({ commit }) {
      http.get("projetos").then((res) => {
        commit("DEFINIR_PROJETOS", res.data);
      });
    },
    [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
      return http.post("projetos", {
        nome: nomeDoProjeto,
      });
    },
    [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
      return http.put(`projetos/${projeto.id}`, projeto);
    },
    [REMOVER_PROJETO](contexto, id: string) {
      return http
        .delete(`projetos/${id}`)
        .then(() => this.commit("EXCLUI_PROJETO", id));
    },
    [OBTER_TAREFAS]({ commit }) {
      http.get("tarefas").then((res) => {
        commit("DEFINIR_TAREFAS", res.data);
      });
    },
    [CADASTRAR_TAREFA](contexto, tarefa: ITarefa) {
      return http.post("tarefas", tarefa).then((res) => {
        contexto.commit("ADICIONA_TAREFA", res.data);
      });
    },
    [ALTERAR_TAREFA](contexto, tarefa: ITarefa) {
      return http.put(`tarefas/${tarefa.id}`, tarefa).then((res) => {
        store.commit("ALTERA_TAREFA", res.data);
      });
    },
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
