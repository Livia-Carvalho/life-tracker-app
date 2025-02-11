import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TMidia } from '../model/midia.model';

@Injectable({
  providedIn: 'root'
})
export class MidiaService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<TMidia[]> {
    return this.http.get<TMidia[]>('/api/midias');
  }

  get(id: number): Observable<TMidia> {
    return this.http.get<TMidia>(`/api/midias/${id}`);
  }

  create(midia: TMidia): Observable<TMidia> {
    return this.http.post<TMidia>('/api/midias', midia);
  }

  update(midia: TMidia): Observable<TMidia> {
    return this.http.put<TMidia>(`/api/midias/${midia.id}`, midia);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/midias/${id}`);
  }
}