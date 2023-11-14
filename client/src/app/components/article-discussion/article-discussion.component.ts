import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/user.service';
import { io } from 'socket.io-client';

interface Comment {
  _id?: string;
  date: string | null;
  comment: string;
  username: string;
  articleId: string;
}

@Component({
  selector: 'app-article-discussion',
  templateUrl: './article-discussion.component.html',
  providers: [DatePipe],
})
export class ArticleDiscussionComponent implements OnInit {
  @Input() articleId: string = '';
  commentForm: FormGroup;
  comments: Comment[] = [];
  currentUser: any;
  private socket: any;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
    });

    this.socket = io('http://localhost:25000');
  }

  ngOnInit() {
    this.fetchComments();
    this.currentUser = this.userService.getUserData();

    this.socket.on('newComment', (data: any) => {
      this.comments.push(data.comment);
    });

    this.socket.on('commentDeleted', (data: any) => {
      const deletedCommentIndex = this.comments.findIndex(comment => comment._id === data.commentId);
      if (deletedCommentIndex !== -1) {
        this.comments.splice(deletedCommentIndex, 1);
      }
    });
  }

  fetchComments() {
    const apiUrl = `http://localhost:25000/api/comments/getComments?articleId=${this.articleId}`;

    this.http.get(apiUrl).subscribe(
      (data: any) => {
        this.comments = data.comments;
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }

  addComment() {
    if (this.commentForm.valid) {
      if (this.currentUser) {
        const newComment: Comment = {
          _id: '',
          date: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
          comment: this.commentForm.value.comment,
          username: this.currentUser.name,
          articleId: this.articleId,
        };

        this.http.post('http://localhost:25000/api/comments/addComment', newComment).subscribe(
          (data: any) => {
            this.comments.push(data.comment);
            this.commentForm.reset();
          },
          (error) => {
            console.error('Error adding comment:', error);
          }
        );
      } else {
        alert('User is not authenticated');
      }
    }
  }
}

