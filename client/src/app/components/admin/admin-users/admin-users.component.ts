// admin-users.component.ts

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

interface User {
  id: string;
  name: string;
  role: string;
  email: string;
}

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  openEditUserModal(user: User): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: { user },
    });
  }

  openDeleteConfirmationModal(user: any): void {
    const message = 'Are you sure you want to delete this user?';
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: { message },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(user._id);
      }
    });
  }

  openAddUserModal(): void {
    const dialogRef = this.dialog.open(AddUserComponent);
  }

  fetchUsers(): void {
    // Assuming you have an API endpoint to fetch users
    const apiUrl = 'http://localhost:25000/api/auth/allUsers'; // Update the URL accordingly

    this.http.get<User[]>(apiUrl).subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(userId: string): void {
    const deleteUrl = `http://localhost:25000/api/auth/deleteUser/${userId}`;

    this.http.delete(deleteUrl).subscribe(
      () => {
        alert(`User with ID ${userId} deleted successfully.`);
        this.users = this.users.filter((user) => user.id !== userId);
        window.location.reload();
      },
      (error) => {
        console.error(`Error deleting user with ID ${userId}:`, error);
      }
    );
  }
}
