import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
})
export class AdminCategoriesComponent implements OnInit {
  categories: any[] = [];
  constructor(public dialog: MatDialog) {
    fetch('http://localhost:25000/api/articles/getCategories')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data && data.categories && Array.isArray(data.categories)) {
          this.categories = data.categories.map((category: any) => ({
            id: category._id,
            name: category.name,
            description: category.description,
            imageUrl: category.image,
          }));
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }

  ngOnInit(): void {}

  openEditCategoryModal(category: any): void {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      data: { category },
    });
  }

  openDeleteConfirmationModal(categoryId: string): void {
    const message = 'Are you sure you want to delete this category?';
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: { message },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        fetch(
          `http://localhost:25000/api/articles/deleteCategory/${categoryId}`,
          {
            method: 'DELETE',
          }
        )
          .then((response) => {
            if (response.status !== 200) {
              alert('Error deleting category');
              return;
            }
            return response.json();
          })
          .then((data) => {
            if (data.message) {
              alert(data.message);
              window.location.reload();
            }
          });
      }
    });
  }

  openAddCategoryModal(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent);
  }
}
