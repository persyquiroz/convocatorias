import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Carrera } from '../models/carrera.model';
import { Pagination } from '../models/pagination.model';
import { TransformService } from './transform.service';

@Injectable({
  providedIn: 'root',
})
export class CarreraService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrlSso;
  private transf = inject(TransformService);
  
  private apiUrl = this.baseUrl + '/comun/conv-carreras/search?ordering=nombre';
  private dataCarreras$ = this.http.get<Carrera[]>(this.apiUrl)
  .pipe(shareReplay());

  listadoPag(filtros: any): Observable<{data: Carrera[], pagination: Pagination}> {
    const apiUrl = this.baseUrl + '/comun/conv-carreras/';
    let params = this.transf.params(filtros);
    return this.http.get<{data: Carrera[], pagination: Pagination}>(apiUrl+params);
  }

  search(): Observable<Carrera[]> {
    return this.dataCarreras$;
  }

}
