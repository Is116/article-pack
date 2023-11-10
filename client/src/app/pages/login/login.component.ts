import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.controls['email'].value;
      const password = this.loginForm.controls['password'].value;

      // send data to server with API localhost:25000
      fetch('http://localhost:25000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          // if response status is not 200, show error message
          if (response.status !== 200) {
            alert('Invalid credentials or user not found');
            return;
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          // save data in a tasty tookie because I'm a cookie monster:)))))))
          // only if response status is 200
          if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = '/';
          }
        });
    }
  }
}
