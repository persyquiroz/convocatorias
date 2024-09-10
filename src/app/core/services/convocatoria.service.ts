import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay, startWith, Subject, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pagination } from '../models/pagination.model';
import { TransformService } from './transform.service';
import { Convocatoria } from '../models/convocatoria.model';

@Injectable({
  providedIn: 'root',
})
export class ConvocatoriaService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrlSso;
  private transf = inject(TransformService);
  
  // private apiUrl = this.baseUrl + '/comun/conv-convocatorias/';
  // private dataConvocatoria$ = this.http.get<{data: Convocatoria[], pagination: Pagination}>(this.apiUrl)
  // .pipe(shareReplay())

  // private refreshSubject = new Subject<void>();

  listadoPag(filtros: any): Observable<{data: Convocatoria[], pagination: Pagination}> {
    const apiUrl = this.baseUrl + '/comun/conv-convocatorias/';
    let params = this.transf.params(filtros);
    return this.http.get<{data: Convocatoria[], pagination: Pagination}>(
      apiUrl+params);

    // return this.refreshSubject.pipe(
    //   startWith(null), // Emitir un valor inicial para la primera suscripción
    //   switchMap(() => this.http.get<{data: Convocatoria[], pagination: Pagination}>(apiUrl+params))
    // );
  }

  // refreshData(): void {
  //   this.refreshSubject.next();
  // }

  sincronizar() {
    const apiUrl = this.baseUrl + '/comun/scraping/convocatorias-add/';
    return this.http.get<any>(apiUrl);
  }

  detalle(id: number): Observable<Convocatoria> {
    const apiUrl = this.baseUrl + '/comun/conv-convocatorias/detalle';
    let params = this.transf.params({id: id});
    return this.http.get<Convocatoria>(apiUrl+params);
  }
}
