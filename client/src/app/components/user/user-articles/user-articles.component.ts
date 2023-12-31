import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditArticalComponent } from '../../admin/edit-artical/edit-artical.component';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';
import { AddArticalComponent } from '../../admin/add-artical/add-artical.component';
import { ViewArticalContentComponent } from '../../admin/view-artical-content/view-artical-content.component';
import { AdminCommentsComponent } from '../../admin/admin-comments/admin-comments.component';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-articles',
  templateUrl: './user-articles.component.html',
})
export class UserArticlesComponent implements OnInit {
  articles = [] as any[];
  user:any;
  constructor(public dialog: MatDialog, private userService: UserService) {

    this.user = this.userService.getUserData();

    fetch(`http://localhost:25000/api/articles/getUserArticles?userId=${this.user.id}`, {
      method: 'GET',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.articles) {
          const articlesWithCategoryNames = data.articles.map(
            async (article: any) => {
              try {
                const categoryResponse = await fetch(
                  `http://localhost:25000/api/articles/getCategory/${article.category}`
                );
                if (!categoryResponse.ok) {
                  throw new Error(`Request failed with status ${categoryResponse.status}`);
                }
                const categoryData = await categoryResponse.json();
                
                if (categoryData && categoryData.category) {
                  article.id = article._id;
                  article.categoryName = categoryData.category.name;
                  article.categoryId = categoryData.category._id;
                } else {
                  console.error('Category data is not in the expected format:', categoryData);
                }
              } catch (categoryError) {
                console.error('Error fetching category data:', categoryError);
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