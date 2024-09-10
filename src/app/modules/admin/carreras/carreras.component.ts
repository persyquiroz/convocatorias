import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Carrera } from '../../../core/models/carrera.model';
import { map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { CarreraService } from '../../../core/services/carrera.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import {MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { Pagination } from '../../../core/models/pagination.model';
import { MatPaginatorIntlEsp } from '../../../core/services/mat-paginator-es';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-carreras',
  standalone: true,
  imports: [
    AsyncPipe,
    MatPaginatorModule,
    CommonModule,
    MatProgressBarModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: MatPaginatorIntl,
    useClass: MatPaginatorIntlEsp,
  }],
  templateUrl: './carreras.component.html',
  styleUrl: './carreras.component.scss'
})
export class CarrerasComponent implements OnInit{
  changeDetectionRef = inject(ChangeDetectorRef);
  carreras$ = new Observable<Carrera[]>();
  carreraService = inject(CarreraService);
  pagination$ = new Observable<Pagination>();
  paging = {search:'', page_size: 10, last_page: 1, current_page: 1, ordering: 'nombre'};
  cargado: boolean = false;
  ngOnInit() {
    this.listar();
  }

  listar(){
    this.cargado = false; 
    const data$ = this.carreraService.listadoPag(this.paging).pipe(shareReplay(1));
    this.carreras$ = data$.pipe(switchMap((resul) => {
        this.cargado = true; 
        return of(resul.data);
      }
      ));
    this.pagination$ = data$.pipe(map((resul) => resul.pagination));
    this.changeDetectionRef.markForCheck();
  }

  changePage(e: PageEvent){
    console.log("e: ", e);
    if(this.paging['page_size'] != e.pageSize){
      this.paging['page_size'] = e.pageSize;
      this.paging['current_page'] = 1;
    }else{
      this.paging['page_size'] = e.pageSize;
      this.paging['current_page'] =  e.pageIndex + 1;
    }
    this.listar();
  }

}
