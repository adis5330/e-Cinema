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

const routes: Routes = [
 

  {
    path: 'movies',
    component : MoviesComponent,
    
  },
  {
    path : 'newMovie',
    component : NewMovieComponent
    },
  {
    path: 'upcomingMovies',
    component: UpComingMoviesComponent
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
