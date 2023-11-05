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
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }
  
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
        // this.deleteCategory(categoryId);
      }
    });
  }
  
  openAddCategoryModal(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent);
  }

  categories = [
    {
      id:"1",
      name: 'Books',
      description: 'Explore a world of knowledge and imagination through our vast collection of books.',
      imageUrl: 'https://img.freepik.com/free-vector/hand-drawn-literature-illustration_23-2149290554.jpg?w=740&t=st=1697902873~exp=1697903473~hmac=0a7e9f21fee479c18d8531a891b1d11f025b71c4c15d0950733f3da4ff56dfd2',
      link: 'articles?search=&category=Books',
    },
    {
      id:"2",
      name: 'Arts',
      description: 'Dive into the world of creativity and self-expression with our diverse collection.',
      imageUrl: 'https://img.freepik.com/free-photo/abstract-colorful-splash-3d-background-generative-ai-background_60438-2494.jpg?w=1380&t=st=1697902967~exp=1697903567~hmac=1bb20b863ef8693a784247eb3886a245da814cf394b312a5ecf63ff404ea6638',
      link: 'articles?search=&category=Arts',
    },
    {
      id:"3",
      name: 'UX',
      description: 'Enhance user experiences and design with cutting-edge user interface and user.',
      imageUrl: 'https://img.freepik.com/free-vector/gradient-ui-ux-elements-background_23-2149056159.jpg?t=st=1697903176~exp=1697903776~hmac=c957b08d3daeadb724d29fa245f0c92dbd1f5abd0d781268701c1f6d7d119994',
      link: 'articles?search=&category=UX',
    },
    {
      id:"4",
      name: 'Philosophy',
      description: 'Delve into the depths of philosophical thought and contemplation with our.',
      imageUrl: 'https://img.freepik.com/free-vector/hand-drawn-mindfulness-concept-with-characters_52683-69073.jpg?w=740&t=st=1697903055~exp=1697903655~hmac=67f080c9c8752ff32fa363864b231c572de07466125b74f6bae9b52320e3ab56',
      link: 'articles?search=&category=Philosophy',
    },
  ];
}
