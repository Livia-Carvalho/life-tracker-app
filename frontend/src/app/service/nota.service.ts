import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TNota } from '../model/nota.model';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<TNota[]> {
    return this.http.get<TNota[]>('/api/notas');
  }

  get(id: number): Observable<TNota> {
    return this.http.get<TNota>(`/api/notas/${id}`);
  }

  create(nota: TNota): Observable<TNota> {
    return this.http.post<TNota>('/api/notas', nota);
  }

  update(nota: TNota): Observable<TNota> {
    return this.http.put<TNota>(`/api/notas/${nota.id}`, nota);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/notas/${id}`);
  }
}