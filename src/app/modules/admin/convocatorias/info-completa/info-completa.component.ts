import {ChangeDetectionStrategy, Component, Inject, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Convocatoria } from '../../../../core/models/convocatoria.model';

@Component({
  selector: 'app-info-completa',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './info-completa.component.html',
  styleUrl: './info-completa.component.scss'
})
export class InfoCompletaComponent {
  
  readonly dialogRef = inject(MatDialogRef<InfoCompletaComponent>);
  sanitizer = inject(DomSanitizer);

  url_info: SafeResourceUrl = "";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Convocatoria
    ) {
    // Puedes acceder a los datos a través de `this.data`
    this.url_info = this.sanitizer.bypassSecurityTrustResourceUrl(data.url_info);
  }

  no(): void {
    this.dialogRef.close();
  }

  si(): void {
    this.dialogRef.close(true);
  }

}
