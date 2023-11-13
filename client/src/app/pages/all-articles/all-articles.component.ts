import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

interface article {
  name: string;
  category: string;
  categoryName: string;
  description: string;
  imageSrc: string;
  link: string;
}

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
})
export class AllArticlesComponent {
  articles: article[] = [];

  private searchTerm$ = new Subject<string>();
  private categoryFilter$ = new Subject<string>();

  searchTerm: string = '';
  selectedCategory: string = '';
  filteredArticles: article[] = this.articles;
  categories: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
    fetch('http://localhost:25000/api/articles/getArticles')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data && data.articles) {
          const articlePromises = data.articles.map(async (article: any) => {
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
              link: `/article/${article._id}`,
            };
          });
          Promise.all(articlePromises).then((articles) => {
            this.articles = articles;
            this.filteredArticles = articles;
            this.categories = this.getUniqueCategories();
          });
        } else {
          console.error('Data is not in the expected format:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
      });

    this.searchTerm$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.filterByCategoryAndSearch();
        this.updateQueryParams();
      });

    this.categoryFilter$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.filterByCategoryAndSearch();
        this.updateQueryParams();
      });

    this.categories = this.getUniqueCategories();

    const routeParams = this.route.snapshot.queryParamMap;
    this.selectedCategory = routeParams.get('category') || '';
    this.searchTerm = routeParams.get('search') || '';
    this.filterByCategoryAndSearch();
  }

  onSearchTermChange(term: string) {
    this.searchTerm = term;
    this.searchTerm$.next(term);
  }

  onCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory = target.value;
    this.categoryFilter$.next(this.selectedCategory);
  }

  updateQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.searchTerm,
        category: this.selectedCategory,
      },
      queryParamsHandling: 'merge',
    });
  }

  filterByCategoryAndSearch() {
    this.filteredArticles = this.articles.filter((article) => {
      const categoryFilter =
        !this.selectedCategory ||
        article.categoryName === this.selectedCategory;
      const textSearch =
        !this.searchTerm ||
        article.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      return categoryFilter && textSearch;
    });
  }

  getUniqueCategories(): string[] {
    return Array.from(
      new Set(this.articles.map((article) => article.categoryName))
    );
  }
}
