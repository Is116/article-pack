import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

interface article {
  name: string;
  category: string;
  description: string;
  imageSrc: string;
  link: string;
}

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
})
export class AllArticlesComponent {
  articles: article[] = [
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

  private searchTerm$ = new Subject<string>();
  private categoryFilter$ = new Subject<string>();

  searchTerm: string = '';
  selectedCategory: string = '';
  filteredArticles: article[] = this.articles;
  categories: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.filterByCategoryAndSearch();
        this.updateQueryParams();
      });
  
    this.categoryFilter$
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
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
        !this.selectedCategory || article.category === this.selectedCategory;
      const textSearch =
        !this.searchTerm || article.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      return categoryFilter && textSearch;
    });
  }

  getUniqueCategories(): string[] {
    return Array.from(new Set(this.articles.map((article) => article.category)));
  }
}