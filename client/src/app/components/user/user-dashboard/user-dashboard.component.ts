import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
})
export class UserDashboardComponent {
  
  links = [
    { label: 'Dashboard', url: 'user'},
    { label: 'Articles', url: 'user/articles'},
    { label: 'Settings', url: 'user/settings'},
  ];
}
