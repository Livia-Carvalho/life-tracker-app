import { TAtividade } from "./atividade.model";

export type TCategoria = {
    id: number;
    nome: string;
    atividades: TAtividade[]
  };