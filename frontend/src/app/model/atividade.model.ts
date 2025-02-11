export type TAtividade = {
    id: number;
    nome: string;
    natureza: number; // 0 = neutra, 1 = positiva, 2 = negativa
    icon_url: string;
    categoria_id: number; // Chave estrangeira para CATEGORIA
  };