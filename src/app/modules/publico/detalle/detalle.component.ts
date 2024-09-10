import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ConvocatoriaService } from '../../../core/services/convocatoria.service';
import { Observable, of, shareReplay, switchMap } from 'rxjs';
import { Convocatoria } from '../../../core/models/convocatoria.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.scss'
})
export class DetalleComponent implements OnInit{
  
  cargado: boolean = false;
  readonly dialog = inject(MatDialog);
  router = inject(Router);
  convocatoriaService = inject(ConvocatoriaService);
  detalle$ = new Observable<Convocatoria>();
  changeDetectionRef = inject(ChangeDetectorRef);
  route = inject(ActivatedRoute);
  id: number = 0;
  sanitizer = inject(DomSanitizer);
  url_info: SafeResourceUrl = "";

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      this.getInfo();
    });
  }

  irInicio(){
    this.router.navigate(['']);
  }

  getInfo(){
    const data$ = this.convocatoriaService.detalle(this.id).pipe(shareReplay(1));
    this.detalle$ = data$.pipe(switchMap((resul) => {
        this.cargado = true; 
        this.url_info = this.sanitizer.bypassSecurityTrustResourceUrl(resul.url_info);
        return of(resul);
    }));
    this.changeDetectionRef.markForCheck();
  }
}
