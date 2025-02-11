import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TRegistro } from '../model/registro.model';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<TRegistro[]> {
    return this.http.get<TRegistro[]>('/api/registros');
  }

  get(id: number): Observable<TRegistro> {
    return this.http.get<TRegistro>(`/api/registros/${id}`);
  }

  create(registro: TRegistro): Observable<TRegistro> {
    return this.http.post<TRegistro>('/api/registros', registro);
  }

  update(registro: TRegistro): Observable<TRegistro> {
    return this.http.put<TRegistro>(`/api/registros/${registro.id}`, registro);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/registros/${id}`);
  }
}