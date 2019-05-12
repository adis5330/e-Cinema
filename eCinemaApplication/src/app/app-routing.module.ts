import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { AdminComponent } from './components/admin/admin.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { LeavaCommentComponent } from './components/leava-comment/leava-comment.component';
import { UpComingMoviesComponent } from './components/up-coming-movies/up-coming-movies.component';
import { NewMovieComponent } from './components/movies/new-movie/new-movie.component';
import { AppComponent } from './app.component';
import { NewScheduleComponent } from './components/schedule/new-schedule/new-schedule.component';
import { NewUpcomingMovieComponent } from './components/up-coming-movies/new-upcoming-movie/new-upcoming-movie.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LeaveACommentPageComponent } from './components/leave-acomment-page/leave-acomment-page.component';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'movies/all',
    pathMatch: 'full'
  }
,
  {
    path: 'movies/:type',
    component : MoviesComponent,
  
    children : [{
      path : "dsfdsf",
      component : MoviesComponent
    }]
    
  },
  {
    path : 'newMovie',
    component : NewMovieComponent
    },
    {
      path : 'addCategory',
      component : AddCategoryComponent
    },
    {
      path : 'userRegister',
      component : RegisterUserComponent
    },
    {
      path : 'aboutUs',
      component : LeaveACommentPageComponent
    },
    {
      path : 'newScheduleItem',
      component : NewScheduleComponent
      },
  {
    path: 'upcomingMovies/:type',
    component: UpComingMoviesComponent
  },
  {
    path: 'newUpcomingMovie',
    component: NewUpcomingMovieComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path : 'schedule',
    component : ScheduleComponent
  },
  {
    path: 'contact',
    component : ContactComponent
  },
  {
    path : 'about',
    component: AboutComponent
  },
  {
    path: 'leaveComment',
    component : LeavaCommentComponent
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
