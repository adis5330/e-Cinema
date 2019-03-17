import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { AdminComponent } from './components/admin/admin.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

const routes: Routes = [
 

  {
    path: 'movies',
    component : MoviesComponent
  },{
    path: 'admin',
    component: AdminComponent
  },
  {
    path : 'schedule',
    component : ScheduleComponent
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
