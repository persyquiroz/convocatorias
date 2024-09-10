import {ChangeDetectionStrategy, Component, Inject, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
})
export class ConfirmComponent {
  
  // readonly data: { titulo: string, mensaje: string } = Inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ConfirmComponent>);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { titulo: string, mensaje: string }
    ) {
    // Puedes acceder a los datos a través de `this.data`
  }

  no(): void {
    this.dialogRef.close();
  }

  si(): void {
    this.dialogRef.close(true);
  }

}
