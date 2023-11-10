import { Component } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {
  rightArrow = faArrowRight;

  categories: any[] = [];

  constructor() {
    fetch('http://localhost:25000/api/articles/getCategories')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data && data.categories && Array.isArray(data.categories)) {
          this.categories = data.categories.map((category: any) => ({
            id: category._id,
            name: category.name,
            description: category.description,
            imageSrc: category.image,
            link: `articles?search=&category=${category.name}`,
          }));
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }
}
