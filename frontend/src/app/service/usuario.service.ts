import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TUsuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<TUsuario[]> {
    return this.http.get<TUsuario[]>('/api/usuarios');
  }

  get(id: number): Observable<TUsuario> {
    return this.http.get<TUsuario>(`/api/usuarios/${id}`);
  }

  create(usuario: TUsuario): Observable<TUsuario> {
    return this.http.post<TUsuario>('/api/usuarios', usuario);
  }

  update(usuario: TUsuario): Observable<TUsuario> {
    return this.http.put<TUsuario>(`/api/usuarios/${usuario.id}`, usuario);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/usuarios/${id}`);
  }
}