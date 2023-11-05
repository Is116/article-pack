import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FeaturesArticalsComponent } from './components/features-articals/features-articals.component';
import { AllCategoriesComponent } from './pages/all-categories/all-categories.component';
import { HeroComponent } from './components/hero/hero.component';
import { AllArticlesComponent } from './pages/all-articles/all-articles.component';
import { ArticleSingleComponent } from './pages/article-single/article-single.component';
import { ArticleDiscussionComponent } from './components/article-discussion/article-discussion.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { LandingAboutComponent } from './components/landing-about/landing-about.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminDashboardComponent } from './layouts/admin-dashboard-layout/admin-dashboard-layout.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AddCategoryComponent } from './components/admin/add-category/add-category.component';
import { AdminCategoriesComponent } from './components/admin/admin-categories/admin-categories.component';
import { EditCategoryComponent } from './components/admin/edit-category/edit-category.component';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';
import { AdminArticlesComponent } from './components/admin/admin-articles/admin-articles.component';
import { AddArticalComponent } from './components/admin/add-artical/add-artical.component';
import { EditArticalComponent } from './components/admin/edit-artical/edit-artical.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AddUserComponent } from './components/admin/add-user/add-user.component';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';
import { ViewArticalContentComponent } from './components/admin/view-artical-content/view-artical-content.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CategoriesComponent,
    LandingAboutComponent,
    FeaturesArticalsComponent,
    AllCategoriesComponent,
    HeroComponent,
    AllArticlesComponent,
    ArticleSingleComponent,
    ArticleDiscussionComponent,
    LoginComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    RegisterComponent,
    AdminDashboardComponent,
    SettingsComponent,
    AddCategoryComponent,
    AdminCategoriesComponent,
    EditCategoryComponent,
    ConfirmDeleteComponent,
    AdminArticlesComponent,
    AddArticalComponent,
    EditArticalComponent,
    AdminUsersComponent,
    AddUserComponent,
    EditUserComponent,
    ViewArticalContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
