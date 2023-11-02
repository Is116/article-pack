import { Component } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface artical {
  name: string;
  category: string;
  description: string;
  imageSrc: string;
  link: string;
}

@Component({
  selector: 'app-features-articals',
  templateUrl: './features-articals.component.html',
})
export class FeaturesArticalsComponent {
  rightArrow = faArrowRight;

  articals: artical[] = [
    {
      name: 'Explore a world',
      category: 'Books',
      description: 'Explore a world of knowledge and imagination through our vast collection of books.',
      imageSrc: 'https://img.freepik.com/free-vector/hand-drawn-literature-illustration_23-2149290554.jpg?w=740&t=st=1697902873~exp=1697903473~hmac=0a7e9f21fee479c18d8531a891b1d11f025b71c4c15d0950733f3da4ff56dfd2',
      link: '/article/1',
    },
    {
      name: 'Dive into the',
      category: 'Arts',
      description: 'Dive into the world of creativity and self-expression with our diverse collection of arts.',
      imageSrc: 'https://img.freepik.com/free-photo/abstract-colorful-splash-3d-background-generative-ai-background_60438-2494.jpg?w=1380&t=st=1697902967~exp=1697903567~hmac=1bb20b863ef8693a784247eb3886a245da814cf394b312a5ecf63ff404ea6638',
      link: '/article/2',
    },
    {
      name: 'Enhance',
      category: 'UX',
      description: 'Enhance user experiences and design with cutting-edge user interface and user experience resources.',
      imageSrc: 'https://img.freepik.com/free-vector/gradient-ui-ux-elements-background_23-2149056159.jpg?t=st=1697903176~exp=1697903776~hmac=c957b08d3daeadb724d29fa245f0c92dbd1f5abd0d781268701c1f6d7d119994',
      link: '/article/3',
    },
    {
      name:'Delve into',
      category: 'Philosophy',
      description: 'Delve into the depths of philosophical thought and contemplation with our philosophical resources.',
      imageSrc: 'https://img.freepik.com/free-vector/hand-drawn-mindfulness-concept-with-characters_52683-69073.jpg?w=740&t=st=1697903055~exp=1697903655~hmac=67f080c9c8752ff32fa363864b231c572de07466125b74f6bae9b52320e3ab56',
      link: '/article/4',
    },
  ];

}
