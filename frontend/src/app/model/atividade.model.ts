import { TCategoria } from "./categoria.model";

export type TAtividade = {
    id: number;
    nome: string;
    natureza: number; // 0 = neutra, 1 = positiva, 2 = negativa
    url: string;
    categoria: TCategoria; // Chave estrangeira para CATEGORIA
  };