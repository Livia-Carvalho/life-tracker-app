import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TRegistroAtividade } from '../model/registroAtividade.model';

@Injectable({
  providedIn: 'root'
})
export class RegistroAtividadeService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<TRegistroAtividade[]> {
    return this.http.get<TRegistroAtividade[]>('/api/registro-atividades');
  }

  get(id: number): Observable<TRegistroAtividade> {
    return this.http.get<TRegistroAtividade>(`/api/registro-atividades/${id}`);
  }

  create(registroAtividade: TRegistroAtividade): Observable<TRegistroAtividade> {
    return this.http.post<TRegistroAtividade>('/api/registro-atividades', registroAtividade);
  }

  update(registroAtividade: TRegistroAtividade): Observable<TRegistroAtividade> {
    return this.http.put<TRegistroAtividade>(`/api/registro-atividades/${registroAtividade.id}`, registroAtividade);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/registro-atividades/${id}`);
  }
}