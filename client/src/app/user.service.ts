import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private user: any;

  setUserData(user: any) {
    this.user = user;
  }

  getUserData() {
    return this.user;
  }

  // Add a method to fetch and set user data
  initializeUserData() {
    const token = localStorage.getItem('token');
    if (!token) return;

    return fetch('http://localhost:25000/api/auth/getUser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        }
        return response.json();
        
      })
      .then((data) => {
        this.setUserData(data);
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.user = null;
    // redirect to home page
    window.location.href = '/';
  }
}
