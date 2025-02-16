import { TNota } from "./nota.model";

export type TRegistro = {
  id?: number;
  reg_date: string;
  humor: number;
  alerta_vermelho: boolean;
  analise?: string;
  nota: TNota;
  usuario: { id: number };
}