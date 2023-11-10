import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  editUserForm: FormGroup;
  userData: any;

  constructor(private fb: FormBuilder, private userService: UserService, private http: HttpClient) {
    this.editUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8)]],
      confirmPassword: ['', [Validators.minLength(8)]],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.userData = this.userService.getUserData();
  
    if (this.userData) {
      this.editUserForm.patchValue({
        name: this.userData.name,
        email: this.userData.email,
      });
    } else {
      console.error('User data not available');
    }
  }
  
  

  saveChanges() {
    console.log(this.userData);
    if (this.editUserForm.valid) {
      const { name, email, role } = this.editUserForm.value;
  
      const apiUrl = `http://localhost:25000/api/auth/updateUser/${this.userData.id}`;
  
      const updatedUser = {
        name,
        email,
        role,
      };
  
      this.http.put(apiUrl, updatedUser).subscribe(
        (response: any) => {
          alert('User updated successfully:'+response);
          this.userData = response; 
          window.location.reload();
        },
        (error: any) => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      console.error('Invalid form data or missing user data');
    }
  }
  
  
  

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean; } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }
}

