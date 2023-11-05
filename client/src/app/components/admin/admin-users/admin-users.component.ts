import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { EditUserComponent } from '../edit-user/edit-user.component';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
})
export class AdminUsersComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openEditUserModal(user: any): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: { user },
    });
  }
  

  openDeleteConfirmationModal(userId: string): void {
    const message = 'Are you sure you want to delete this user?';
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: { message },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.deleteUser(userId);
      }
    });
  }

  openAddUserModal(): void {
    const dialogRef = this.dialog.open(AddUserComponent);
  }

  users = [
    {
      id: '1',
      name: 'John Doe',
      role: 'Admin',
      email: 'johndoe@example.com',
    },
    {
      id: '2',
      name: 'Jane Smith',
      role: 'User',
      email: 'janesmith@example.com',
    },
    {
      id: '3',
      name: 'Alice Johnson',
      role: 'User',
      email: 'alicejohnson@example.com',
    },
    // Add more sample users as needed
  ];
}

