import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import VTarefas from "@/views/VTarefas.vue";
import VProjetos from "@/views/VProjetos.vue";
import VLista from "@/views/Projetos/VLista.vue";
import VFormularioProjetos from "../views/Projetos/VFormularioProjetos.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "tarefas",
    component: VTarefas,
  },
  {
    path: "/projetos",
    component: VProjetos,
    children: [
      {
        path: "",
        name: "projetos",
        component: VLista,
      },
      {
        path: "novo",
        name: "Novo projeto",
        component: VFormularioProjetos,
      },
      {
        path: ":id",
        name: "Editar projeto",
        component: VFormularioProjetos,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
