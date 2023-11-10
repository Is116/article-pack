// article-discussion.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/user.service';

interface Comment {
  date: string | null;
  comment: string;
  username: string; // Change 'userId' to 'username'
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

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchComments();
    this.currentUser = this.userService.getUserData();
  }

  fetchComments() {
    const apiUrl = `http://localhost:25000/api/comments/getComments?articleId=${this.articleId}`;

    this.http.get(apiUrl).subscribe(
      (data: any) => {
        this.comments = data.comments.map((comment: any) => ({
          date: comment.date,
          comment: comment.comment,
          username: comment.username,
          articleId: comment.articleId,
        }));
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
          date: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
          comment: this.commentForm.value.comment,
          username: this.currentUser.name,
          articleId: this.articleId,
        };

        console.log(this.currentUser);
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
