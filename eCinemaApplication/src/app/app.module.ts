import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminComponent } from './components/admin/admin.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { FormsModule }   from '@angular/forms';
import { ScheduleComponent } from './components/schedule/schedule.component';
@NgModule({
  declarations: [
    AppComponent,
    
    MoviesComponent,
    HeaderComponent,
    AdminComponent,
    DropdownDirective,
    ScheduleComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
