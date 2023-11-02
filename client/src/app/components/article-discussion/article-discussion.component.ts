
import { Component } from'@angular/core';
import { FormBuilder, FormGroup, Validators } from'@angular/forms';

interface Comment {
  username: string;
  date: string;
  comment: string;
}

@Component({
  selector: 'app-article-discussion',
  templateUrl: './article-discussion.component.html',
})
export class ArticleDiscussionComponent {
  commentForm: FormGroup;
  comments: Comment[] = [
    {
      username: "Michael Gough",
      date: "2022-02-08",
      comment: "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools are as important as the creation of the design strategy."
    },
    {
      username: "Jese Leos",
      date: "2022-02-12",
      comment: "Much appreciated! Glad you liked it ☺️"
    },
    {
      username: "Bonnie Green",
      date: "2022-03-12",
      comment: "The article covers the essentials, challenges, myths and stages the UX designer should consider while creating the design strategy."
    },
    {
      username: "Helene Engels",
      date: "2022-06-23",
      comment: "Thanks for sharing this. I do come from Backend development and explored some of the tools to design my Side Projects."
    },
  ];

  constructor(private fb: FormBuilder) {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
    });
  }

  addComment() {
    if (this.commentForm.valid) {
      const newComment: Comment = {
        username: 'Your Username',
        date: new Date().toISOString(),
        comment: this.commentForm.value.comment,
      };

      this.comments.push(newComment);
      this.commentForm.reset(); 
    }
  }
}