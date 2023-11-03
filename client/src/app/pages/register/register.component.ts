import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)],],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)],]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
  }

  signup() {
    if (this.signupForm.valid) {
      const email = this.signupForm.controls['email'].value;
      const password = this.signupForm.controls['password'].value;
    }
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }
}
