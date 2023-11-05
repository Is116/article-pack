import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent {
  links = [
    { label: 'Dashboard', url: '/admin' },
    { label: 'Categories', url: '/admin/categories' },
    { label: 'Articles', url: '/admin/articles' },
    { label: 'Users', url: '/admin/users' },
    { label: 'Settings', url: '/admin/settings' },
  ]
}
