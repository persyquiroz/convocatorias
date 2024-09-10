import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor() { }

  set(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Obtener datos de localStorage
  get(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // Eliminar datos de localStorage
  delete(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpiar todo localStorage
  clearAll(): void {
    localStorage.clear();
  }
}