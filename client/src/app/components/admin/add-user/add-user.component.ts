import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;

  roles: string[] = ['Admin', 'User'];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  addUser() {
    if (this.userForm.valid) {
      const name = this.userForm.controls['name'].value;
      const email = this.userForm.controls['email'].value;
      const role = this.userForm.controls['role'].value;
      const password = this.userForm.controls['password'].value;
      const confirmPassword = this.userForm.controls['confirmPassword'].value;

      if (password !== confirmPassword) {
        console.log('Password and confirm password do not match');
      } else {
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Role:', role);
        console.log('Password:', password);

        this.userForm.reset();
      }
    }
  }
}
