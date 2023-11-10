import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';
import { HttpClient } from '@angular/common/http';

interface Comment {
  _id: string;
  username: string;
  comment: string;
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
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: { articleId: string }
  ) {
    this.articleId = data.articleId;
    this.loadComments();
  }

  ngOnInit() {
  }

  loadComments() {
    const apiUrl = `http://localhost:25000/api/comments/getComments?articleId=${this.articleId}`;

    this.http.get(apiUrl).subscribe(
      (data: any) => {
        if (data && data.comments) {
          console.log(data);
          this.comments = data.comments;
        } else {
          console.error('Invalid response format:', data);
        }
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }

  deleteComment(commentId: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        message: 'Are you sure you want to delete this comment?',
      },
    });
      this.http.delete(`http://localhost:25000/api/comments/deleteComment/${commentId}`).subscribe(
        () => {
          this.comments = this.comments.filter(comment => comment._id !== commentId);
          location.reload();
        },
        (error) => {
          console.error('Error deleting comment:', error);
        }
      );

    dialogRef.afterClosed().subscribe((result) => {
      
    });
  }
}
