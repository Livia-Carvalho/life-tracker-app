export type TMidia = {
    id: number;
    tipo: string; // Ex: 'jpg', 'png', 'gif'
    url: string;
    nota_id: number; // Chave estrangeira para NOTA
  };