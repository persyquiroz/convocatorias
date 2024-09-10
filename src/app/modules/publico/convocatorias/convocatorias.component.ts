import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorIntlEsp } from '../../../core/services/mat-paginator-es';
import { debounceTime, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Convocatoria } from '../../../core/models/convocatoria.model';
import { ConfirmComponent } from '../../../shared/pages/confirm/confirm.component';
import { InfoCompletaComponent } from '../../admin/convocatorias/info-completa/info-completa.component';
import {MatCardModule} from '@angular/material/card';
import { Store } from '@ngrx/store';
import { loadCarreras, loadConvocatorias } from './store/convocatorias.actions';
import { selectCarreras, selectConvocatorias, selectConvocatoriasPag } from './store/convocatorias.selectors';
import { Router } from '@angular/router';
import { StorageService } from '../../../core/services/localstorage.service';
// import { StorageService } from '../../../core/services/localstorage.service';

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
    MatInputModule,
    MatCardModule,
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
  /*convocatorias$ = new Observable<Convocatoria[]>();
  convocatoriaService = inject(ConvocatoriaService);
  carreraService = inject(CarreraService);*/
  store = inject(Store);
  carreras$ = this.store.select(selectCarreras);
  convocatorias$ = this.store.select(selectConvocatorias);

  // pagination$ = new Observable<Pagination>();
  pagination$ = this.store.select(selectConvocatoriasPag);
  paging: any = {search:'', page_size: 9, last_page: 1, current_page: 1, 
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
    sueldo_: [this.sueldos[3]['id'], []],
    search: ['', []],
    current_page: [1, []],
    page_size: [9, []],
  });
  //carreras$ = new Observable<Carrera[]>();
  $subject: Subject<string> = new Subject<string>();

  buscado = signal("");
  buscado_text = computed(() => this.buscado()? "Se ha buscado con \""+this.buscado()+"\"":"" );
  router = inject(Router);
  // storageServ = inject(StorageService);
  key_local: string = 'filtro-convos';
  storageService = inject(StorageService);

  constructor(){
    effect(()=>{
      console.log("Cambió el valor buscado: "+this.buscado());
    });
  }
  ngOnInit() {
    
    let filtros = this.storageService.get(this.key_local);
    if(filtros){
      this.myform.patchValue(filtros);
      this.paging.current_page = filtros['current_page'];
      this.paging.page_size = filtros['page_size'];
    }

    this.store.dispatch(loadCarreras());
    this.listar();
    this.$subject.pipe(debounceTime(500)).subscribe((event: string) => this.listarPor());
  }
  
  listar(){
    //this.myform.disable();
    this.cargado = false;
    let params = this.myform.value;
    delete this.paging['sueldo__gte'];
    delete this.paging['sueldo__lte'];
    if(params['sueldo_'] != 'T'){
      let sueldos = params['sueldo_'].split("-");
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
    this.paging['sueldo_'] = params['sueldo_'];
    this.buscado.set(this.paging['search']);
    this.storageService.set(this.key_local, this.paging);
    this.store.dispatch(loadConvocatorias({paging:Object.assign({}, this.paging)}));
    this.cargado = true;
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
    // this.sincronizando = true;
    // this.convocatoriaService.sincronizar().subscribe({
    //   next: data => {
    //     // console.log('Data fetched:', data);
    //     this.sincronizando = false;
    //     this.listar();
    //   },
    //   error: err => {
    //     console.error('Error:', err);
    //     this.sincronizando = false;
    //   }
    // });
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

  verDetalle(id: number){
    this.router.navigate(['/detalle/'+id]);
  }

}
