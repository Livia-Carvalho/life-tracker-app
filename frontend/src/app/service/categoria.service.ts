import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TCategoria } from '../model/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<TCategoria[]> {
    return this.http.get<TCategoria[]>('/categorias');
  }

  get(id: number): Observable<TCategoria> {
    return this.http.get<TCategoria>(`/categorias/${id}`);
  }

  create(categoria: TCategoria): Observable<TCategoria> {
    return this.http.post<TCategoria>('/categorias', categoria);
  }

  update(categoria: TCategoria): Observable<TCategoria> {
    return this.http.put<TCategoria>(`/categorias/${categoria.id}`, categoria);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/categorias/${id}`);
  }
}