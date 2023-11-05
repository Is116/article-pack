import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private fb: FormBuilder
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

      this.user.name = name;
      this.user.email = email;
      this.user.role = role;

      this.dialogRef.close(this.user);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}