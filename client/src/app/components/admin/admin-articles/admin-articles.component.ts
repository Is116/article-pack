import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';
import { AddArticalComponent } from '../add-artical/add-artical.component';
import { EditArticalComponent } from '../edit-artical/edit-artical.component';
import { ViewArticalContentComponent } from '../view-artical-content/view-artical-content.component';
import { AdminCommentsComponent } from '../admin-comments/admin-comments.component';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
})
export class AdminArticlesComponent implements OnInit {
  articles = [] as any[];
  constructor(public dialog: MatDialog) {
    fetch('http://localhost:25000/api/articles/getArticles')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data && data.articles) {
          const articlesWithCategoryNames = data.articles.map(
            async (article: any) => {
              const categoryResponse = await fetch(
                `http://localhost:25000/api/articles/getCategory/${article.category}`
              );
              const categoryData = await categoryResponse.json();

              const userResponse = await fetch(
                `http://localhost:25000/api/auth/getUserById/${article.author}`
              );
              const userData = await userResponse.json();

              if (categoryData && categoryData.category) {
                article.id = article._id;
                article.categoryName = categoryData.category.name;
                article.categoryId = categoryData.category._id;
                article.userName = userData.name;
                article.userId = userData._id;
                
              } else {
                console.error(
                  'Category data is not in the expected format:',
                  categoryData,
                  userData
                );
              }
              return article;
            }
          );
          Promise.all(articlesWithCategoryNames).then((articles) => {
            this.articles = articles;
          });
        } else {
          console.error('Data is not in the expected format:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
      });
  }

  ngOnInit(): void {}

  openEditArticalModal(article: any): void {
    const dialogRef = this.dialog.open(EditArticalComponent, {
      data: { articleData: article },
    });
  }
  openDeleteConfirmationModal(articalId: string): void {
    const message = 'Are you sure you want to delete this Artical?';
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: { message },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // delete artical from server
        fetch(
          `http://localhost:25000/api/articles/deleteArticle/${articalId}`,
          {
            method: 'DELETE',
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.message) {
              alert(data.message);
            } else {
              alert('Error deleting artical');
            }
          })
          .catch((error) => {
            alert('Error deleting artical');
          });
      }
    });
  }

  openAddArticalModal(): void {
    const dialogRef = this.dialog.open(AddArticalComponent);
  }

  viewContent(content: string): void {
    this.dialog.open(ViewArticalContentComponent, {
      data: { content },
    });
  }

  viewComments(articleId: string): void {
    const dialogRef = this.dialog.open(AdminCommentsComponent, {
      data: { articleId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }
}
