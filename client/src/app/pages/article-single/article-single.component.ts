import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Article {
  id: string;
  title: string;
  category: string;
  categoryName: string;
  content: string;
  imageSrc: string;
}

@Component({
  selector: 'app-article-single',
  templateUrl: './article-single.component.html',
})
export class ArticleSingleComponent {
  articles: Article[] = [];
  article: Article | null = null;

  constructor(private route: ActivatedRoute) {
    fetch('http://localhost:25000/api/articles/getArticles')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.articles) {
          const articlePromises = data.articles.map(async (article: any) => {
            const categoryResponse = await fetch(
              `http://localhost:25000/api/articles/getCategory/${article.category}`
            );
            const categoryData = await categoryResponse.json();
            return {
              id: article._id,
              title: article.name,
              category: article.category,
              categoryName: categoryData.category.name,
              content: article.content,
              imageSrc: article.image,
            };
          });
          Promise.all(articlePromises).then((articles) => {
            this.articles = articles;
            this.initializeArticle();
          });
        } else {
          console.error('Data is not in the expected format:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
      });
  }

  initializeArticle() {
    this.route.paramMap.subscribe((params) => {
      const articleId = params.get('id');
      console.log('articleId', articleId);
      if (articleId) {
        const foundArticle = this.articles.find(
          (article) => article.id === articleId
        );
        if (foundArticle) {
          this.article = foundArticle;
        } else {
          console.error('Article not found!');
        }
      }
    });
  }
}
