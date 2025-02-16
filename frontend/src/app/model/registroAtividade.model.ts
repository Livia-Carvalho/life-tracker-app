import { TAtividade } from "./atividade.model";
import { TRegistro } from "./registro.model";

export type TRegistroAtividade = {
    id?: number;
    registro: TRegistro; // Chave estrangeira para REGISTRO
    atividade: TAtividade; // Chave estrangeira para ATIVIDADE
  };