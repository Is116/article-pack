import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-layout',
  templateUrl: './admin-dashboard-layout.component.html',
})

export class AdminDashboardComponent {
  sidebarData: SidebarData = {
    navigationLinks: [
      { label: 'Dashboard', link: '/admin/dashboard' },
      { label: 'Categories', link: '/admin/categories' },
      { label: 'Articles', link: '/admin/articles' },
      { label: 'Users', link: '/admin/users' },
      { label: 'Settings', link: '/admin/settings' },
    ],
    userProfile: {
      avatar: 'user-avatar.jpg',
      username: 'Admin User'
    }
  };
}

interface NavigationLink {
  label: string;
  link: string;
}

interface UserProfile {
  avatar: string;
  username: string;
}

interface SidebarData {
  navigationLinks: NavigationLink[];
  userProfile: UserProfile;
}
