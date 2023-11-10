import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent {
  userForm: FormGroup;
  user: any;
  roles: string[] = ['Admin', 'User'];

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: any },
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.user = data.user;
    this.userForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      role: [this.user.role, [Validators.required]],
      password: [''],
      confirmPassword: [''],
    });
  }

  editUser() {
    if (this.userForm.valid) {
      const name = this.userForm.controls['name'].value;
      const email = this.userForm.controls['email'].value;
      const role = this.userForm.controls['role'].value;

      const apiUrl = `http://localhost:25000/api/auth/updateUser/${this.user._id}`;

      const updatedUser = {
        name,
        email,
        role,
      };

      this.http.put(apiUrl, updatedUser).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          this.dialogRef.close(updatedUser);
          window.location.reload();
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
