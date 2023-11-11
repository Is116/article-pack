import { Component } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface Artical {
  name: string;
  category: string;
  categoryName: string;
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

  articals: Artical[] = [];

  constructor() {
    fetch('http://localhost:25000/api/articles/getArticles')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.articles) {
          const articlePromises = data.articles.slice(0, 4).map(async (article: any) => {
            const categoryResponse = await fetch(
              `http://localhost:25000/api/articles/getCategory/${article.category}`
            );
            const categoryData = await categoryResponse.json();
            return {
              name: article.name,
              category: article.category,
              categoryName: categoryData.category.name,
              description: article.content,
              imageSrc: article.image,
              link: `/artical/${article._id}`,
            };
          });

          Promise.all(articlePromises).then((articles) => {
            this.articals = articles;
          });
        } else {
          console.error('Data is not in the expected format:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
      });
  }
}
