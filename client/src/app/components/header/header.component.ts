import { Component, OnInit } from '@angular/core';
import {
  faInstagram,
  faTwitter,
  faYoutube,
  faBlogger,
} from '@fortawesome/free-brands-svg-icons';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  user: any;

  socialIcons = [
    { route: '/', icon: faInstagram },
    { route: '/', icon: faTwitter },
    { route: '/', icon: faYoutube },
    { route: '/', icon: faBlogger },
  ];
  navLinks = [
    { route: '/', label: 'Home' },
    { route: '/about', label: 'About' },
    { route: '/categories', label: 'Categories' },
    { route: '/articles', label: 'Articles' },
  ];

  dropdownOpen = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.getUserData();
  }

  logout() {
    this.userService.logout();
  }
}
