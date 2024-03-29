import { TipoNotificacao } from "@/interfaces/INotificacao";
import { store } from "@/store";

type Notificador = {
  notificar: (tipo: TipoNotificacao, titulo: string, texto: string) => void;
};

export default (): Notificador => {
  const notificar = (
    tipo: TipoNotificacao,
    titulo: string,
    texto: string
  ): void => {
    store.commit("NOTIFICAR", {
      tipo,
      titulo,
      texto,
    });
  };
  return {
    notificar,
  };
};
