export type TRegistroAtividade = {
    id: number;
    registro_id: number; // Chave estrangeira para REGISTRO
    atividade_id: number; // Chave estrangeira para ATIVIDADE
  };