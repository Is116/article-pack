import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
})
export class ConfirmDeleteComponent {

    constructor(
      public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { message: string }
    ) {}
  
    onCancelClick(): void {
      this.dialogRef.close(false);
    }
  
    onConfirmClick(): void {
      this.dialogRef.close(true); 
    }
}
