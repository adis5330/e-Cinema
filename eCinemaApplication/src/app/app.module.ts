import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminComponent } from './components/admin/admin.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { LeavaCommentComponent } from './components/leava-comment/leava-comment.component';
import { UpComingMoviesComponent } from './components/up-coming-movies/up-coming-movies.component';
import { NewMovieComponent } from './components/movies/new-movie/new-movie.component';
import {inputEventListener} from "./shared/directives/inputEventListener.directive";
import { MoviesService } from './shared/services/movies.service';
import { NewScheduleComponent } from './components/schedule/new-schedule/new-schedule.component';
import { NewUpcomingMovieComponent } from './components/up-coming-movies/new-upcoming-movie/new-upcoming-movie.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { LeaveACommentPageComponent } from './components/leave-acomment-page/leave-acomment-page.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';


@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    HeaderComponent,
    AdminComponent,
    DropdownDirective,
    ScheduleComponent,
    ContactComponent,
    AboutComponent,
    LeavaCommentComponent,
    UpComingMoviesComponent,
    NewMovieComponent,
    inputEventListener,
    NewScheduleComponent,
    NewUpcomingMovieComponent,
    FooterComponent,
    AddCategoryComponent,
    LeaveACommentPageComponent,
    RegisterUserComponent
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
