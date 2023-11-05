import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-artical-content',
  templateUrl: './view-artical-content.component.html',
})
export class ViewArticalContentComponent {
  content: string;

  constructor(
    public dialogRef: MatDialogRef<ViewArticalContentComponent>,
    @Inject(MAT_DIALOG_DATA) data: { content: string }
  ) {
    this.content = data.content;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}