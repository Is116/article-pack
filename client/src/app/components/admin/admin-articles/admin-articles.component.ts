import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';
import { AddArticalComponent } from '../add-artical/add-artical.component';
import { EditArticalComponent } from '../edit-artical/edit-artical.component';
import { ViewArticalContentComponent } from '../view-artical-content/view-artical-content.component';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
})
export class AdminArticlesComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

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
        // this.deleteCategory(categoryId);
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

  articles = [
    {
      id:"1",
      name: 'Explore a world',
      category: 'Books',
      content: 'Explore a world of knowledge and imagination through our vast collection of books.',
      imageUrl: 'https://img.freepik.com/free-vector/hand-drawn-literature-illustration_23-2149290554.jpg?w=740&t=st=1697902873~exp=1697903473~hmac=0a7e9f21fee479c18d8531a891b1d11f025b71c4c15d0950733f3da4ff56dfd2',
      status: 'approved',
      link: '/article/1',
    },
    {
      id:"2",
      name: 'Dive into the',
      category: 'Arts',
      content: 'Dive into the world of creativity and self-expression with our diverse collection of arts.',
      imageUrl: 'https://img.freepik.com/free-photo/abstract-colorful-splash-3d-background-generative-ai-background_60438-2494.jpg?w=1380&t=st=1697902967~exp=1697903567~hmac=1bb20b863ef8693a784247eb3886a245da814cf394b312a5ecf63ff404ea6638',
      status: 'approved',
      link: '/article/2',
    },
    {
      id:"3",
      name: 'Enhance',
      category: 'UX',
      content: 'Enhance user experiences and design with cutting-edge user interface and user experience resources.',
      imageUrl: 'https://img.freepik.com/free-vector/gradient-ui-ux-elements-background_23-2149056159.jpg?t=st=1697903176~exp=1697903776~hmac=c957b08d3daeadb724d29fa245f0c92dbd1f5abd0d781268701c1f6d7d119994',
      status: 'approved',
      link: '/article/3',
    },
    {
      id:"4",
      name:'Delve into',
      category: 'Philosophy',
      content: 'Delve into the depths of philosophical thought and contemplation with our philosophical resources.',
      imageUrl: 'https://img.freepik.com/free-vector/hand-drawn-mindfulness-concept-with-characters_52683-69073.jpg?w=740&t=st=1697903055~exp=1697903655~hmac=67f080c9c8752ff32fa363864b231c572de07466125b74f6bae9b52320e3ab56',
      status: 'approved',
      link: '/article/4',
    },
  ];
}