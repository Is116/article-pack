import { Component } from '@angular/core';
import { faInstagram, faTwitter, faYoutube, faBlogger } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  socialIcons = [
    {route: '/', icon: faInstagram},
    {route: '/', icon: faTwitter},
    {route: '/', icon: faYoutube},
    {route: '/', icon: faBlogger},
  ];
  navLinks = [
    {route: '/', label: 'Home'},
    {route: '/about', label: 'About'},
    {route: '/contact', label: 'Contact'},
    {route: '/articles', label: 'Articles'}
  ];
}
