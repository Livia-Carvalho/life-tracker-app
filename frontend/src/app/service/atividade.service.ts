import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TAtividade } from '../model/atividade.model';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<TAtividade[]> {
    return this.http.get<TAtividade[]>('/api/atividades');
  }

  get(id: number): Observable<TAtividade> {
    return this.http.get<TAtividade>(`/api/atividades/${id}`);
  }

  create(atividade: TAtividade): Observable<TAtividade> {
    return this.http.post<TAtividade>('/api/atividades', atividade);
  }

  update(atividade: TAtividade): Observable<TAtividade> {
    return this.http.put<TAtividade>(`/api/atividades/${atividade.id}`, atividade);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/atividades/${id}`);
  }
}