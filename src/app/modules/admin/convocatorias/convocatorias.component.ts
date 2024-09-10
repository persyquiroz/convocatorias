import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { debounceTime, map, Observable, of, shareReplay, Subject, switchMap } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import {MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { Pagination } from '../../../core/models/pagination.model';
import { MatPaginatorIntlEsp } from '../../../core/services/mat-paginator-es';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Convocatoria } from '../../../core/models/convocatoria.model';
import { ConvocatoriaService } from '../../../core/services/convocatoria.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../../shared/pages/confirm/confirm.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Carrera } from '../../../core/models/carrera.model';
import { CarreraService } from '../../../core/services/carrera.service';
import {MatInputModule} from '@angular/material/input';
import { InfoCompletaComponent } from './info-completa/info-completa.component';

@Component({
  selector: 'app-convocatorias',
  standalone: true,
  imports: [
    AsyncPipe,
    MatPaginatorModule,
    CommonModule,
    MatProgressBarModule,
    MatButtonModule, 
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: MatPaginatorIntl,
    useClass: MatPaginatorIntlEsp,
  }],
  templateUrl: './convocatorias.component.html',
  styleUrl: './convocatorias.component.scss'
})
export class ConvocatoriasComponent implements OnInit{
  changeDetectionRef = inject(ChangeDetectorRef);
  convocatorias$ = new Observable<Convocatoria[]>();
  convocatoriaService = inject(ConvocatoriaService);
  carreraService = inject(CarreraService);
  pagination$ = new Observable<Pagination>();
  paging: any = {search:'', page_size: 10, last_page: 1, current_page: 1, 
    ordering: 'carrera__nombre,-sueldo,entidad__nombre'};
  cargado: boolean = false;
  readonly dialog = inject(MatDialog);
  sincronizando: boolean= false;
  sueldos: {id: string, nombre: string}[] = [
    {id:"0-2000",nombre:"Hasta 2000"},
    {id:"2000-4000",nombre:"De 2000 a 4000"},
    {id:"4000-6000",nombre:"De 4000 a 6000"},
    {id:"6000-8000",nombre:"De 6000 a 8000"},
    {id:"8000-",nombre:"De 8000 a más"}
  ];

  formBuilder = inject(FormBuilder);
  myform: FormGroup = this.formBuilder.group({
    entidad_id: ['T', []],
    carrera_id: ['T', []],
    sueldo: [this.sueldos[3]['id'], []],
    search: ['', []],
  });
  carreras$ = new Observable<Carrera[]>();
  $subject: Subject<string> = new Subject<string>();


  ngOnInit() {
    this.getCarreras();
    this.listar();
    this.$subject.pipe(debounceTime(500)).subscribe((event: string) => this.listarPor());
  }
  
  getCarreras(){
    this.carreras$ = this.carreraService.search().pipe(
      map(data => data),
    );
  }
  

  listar(){
    //this.myform.disable();
    this.cargado = false;
    let params = this.myform.value;
    delete this.paging['sueldo__gte'];
    delete this.paging['sueldo__lte'];
    if(params['sueldo'] != 'T'){
      let sueldos = params['sueldo'].split("-");
      if(sueldos[0]){
        this.paging['sueldo__gte'] = sueldos[0];
      }
      if(sueldos[1]){
        this.paging['sueldo__lte'] = sueldos[1];
      }
    }
    if(params['carrera_id'] != 'T'){
      this.paging['carrera_id'] = params['carrera_id'];
    }else{
      delete this.paging['carrera_id'];
    }
    this.paging['search'] = params['search'].trim();    
    const data$ = this.convocatoriaService.listadoPag(this.paging).pipe(shareReplay(1));
    this.convocatorias$ = data$.pipe(switchMap((resul) => {
        this.cargado = true; 
        //this.myform.enable();
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

  sincronizar(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: {
        titulo: 'Sincronizar',
        mensaje: '¿Está seguro de sincronizar las convocatorias?'
      },
      enterAnimationDuration,
      exitAnimationDuration,

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log('User confirmed the action:', result);
        this.sincronConfirm();
      } else {
        // console.log('User canceled the action');
      }
    });
  }

  sincronConfirm(){
    this.sincronizando = true;
    this.convocatoriaService.sincronizar().subscribe({
      next: data => {
        // console.log('Data fetched:', data);
        this.sincronizando = false;
        this.listar();
      },
      error: err => {
        console.error('Error:', err);
        this.sincronizando = false;
      }
    });
    this.changeDetectionRef.markForCheck();
  }

  changeSelect(valor: any){
    this.listarPor();
  }

  verMas(conv: Convocatoria){
    const dialogRef = this.dialog.open(InfoCompletaComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'fullscreen-dialog',
      hasBackdrop: true,
      data: conv,
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  listarPor(){
    this.paging['current_page'] = 1;
    this.listar();
  }

  listarTime(event: any) {
    this.$subject.next('');
  }

}
