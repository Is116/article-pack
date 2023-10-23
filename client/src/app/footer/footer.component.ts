import { Component } from '@angular/core';
import { faInstagram, faTwitter, faYoutube, faBlogger } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  socialMediaLinks = [
    {
      icon: faInstagram,
      route: 'https://www.instagram.com',
    },
    {
      icon: faTwitter,
      route: 'https://www.twitter.com',
    },
    {
      icon: faYoutube,
      route: 'https://www.youtube.com',
    },
    {
      icon: faBlogger,
      route: 'https://www.blogger.com',
    },
  ];

}
