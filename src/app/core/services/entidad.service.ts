import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pagination } from '../models/pagination.model';
import { TransformService } from './transform.service';
import { Entidad } from '../models/entidad.model';

@Injectable({
  providedIn: 'root',
})
export class EntidadService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrlSso;
  private transf = inject(TransformService);

  listadoPag(filtros: any): Observable<{data: Entidad[], pagination: Pagination}> {
    const apiUrl = this.baseUrl + '/comun/conv-entidades/';
    let params = this.transf.params(filtros);
    return this.http.get<{data: Entidad[], pagination: Pagination}>(apiUrl+params);
  }
}
