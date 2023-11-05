import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';

interface Comment {
  id: string;
  author: string;
  text: string;
}

@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
})
export class AdminCommentsComponent implements OnInit {
  articleId: string;
  comments: Comment[] = [];

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<AdminCommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { articleId: string }
  ) {
    this.articleId = data.articleId;
    this.comments = [
      { id: '1',author:'Isuru Pathirathna' , text: 'Great article!' },
      { id: '2',author:'Isuru Pathirathna', text: 'I have a question about this.' },
      { id: '3',author:'Isuru Pathirathna', text: 'Awesome content!' },
    ];
  }

  ngOnInit() {
  }

  deleteComment(commentId: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.performCommentDeletion(commentId);
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}