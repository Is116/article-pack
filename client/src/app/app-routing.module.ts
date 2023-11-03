import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AllCategoriesComponent } from './pages/all-categories/all-categories.component';
import { AllArticlesComponent } from './pages/all-articles/all-articles.component';
import { ArticleSingleComponent } from './pages/article-single/article-single.component';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RegisterComponent } from './pages/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AdminDashboardComponent } from './layouts/admin-dashboard-layout/admin-dashboard-layout.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AdminCategoriesComponent } from './components/admin/admin-categories/admin-categories.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'categories', component: AllCategoriesComponent },
      { path: 'articles', component: AllArticlesComponent, pathMatch: 'full' },
      { path: 'article/:id', component: ArticleSingleComponent },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
