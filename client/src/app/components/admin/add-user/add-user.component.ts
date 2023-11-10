// add-user.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;

  roles: string[] = ['Admin', 'User'];

  constructor(private fb: FormBuilder, private http: HttpClient) {
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
      const { name, email, role, password, confirmPassword } = this.userForm.value;

      if (password !== confirmPassword) {
        console.log('Password and confirm password do not match');
      } else {
        this.http.post('http://localhost:25000/api/auth/register', { name, email, role, password }).subscribe(
          (response: any) => {
            alert('User registered successfully:'+response.data);
            this.userForm.reset();
            window.location.reload();
          },
          (error) => {
            console.error('Error registering user:', error);
          }
        );
      }
    }
  }
}
