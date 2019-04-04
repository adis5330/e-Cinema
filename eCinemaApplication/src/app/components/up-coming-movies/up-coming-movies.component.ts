import { Component, OnInit } from '@angular/core';
import { UpcomingMoviesService } from 'src/app/shared/services/upcoming-movies.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Movies } from 'src/app/objects/movies.object';

@Component({
  selector: 'app-up-coming-movies',
  templateUrl: './up-coming-movies.component.html',
  styleUrls: ['./up-coming-movies.component.css']
})
export class UpComingMoviesComponent implements OnInit {

  loggedInUser:boolean;
  moviesList = [] ;
  MovieObject : Movies = null;
  
  constructor(private upComingMoviesService : UpcomingMoviesService,private userService:UserService) { }

  ngOnInit() {
   this.loggedInUser =this.userService.isAuthenticated;

  this.upComingMoviesService.getAllUpcomingMovies().subscribe((data : Movies[])=>{
     
      for (var i=0; i<data.length; i++) {
        this.MovieObject = new Movies();
        this.MovieObject.setMovieId(data[i]['id']);
        this.MovieObject.setMovieTitle(data[i]['title']);
        this.MovieObject.setMovieDirector(data[i]['director']);
        this.MovieObject.setMovieActors(data[i]['actors']);
        this.MovieObject.setMoviePicture(data[i]['moviePictures']);
        this.MovieObject.setMovieSummary(data[i]['summary']);
        this.MovieObject.setMovieType(data[i]['type']);
        this.MovieObject.setMovieCreationDate(data[i]['creationDate']);
        this.MovieObject.setMovieCountry(data[i]['country']);
        this.moviesList.push(this.MovieObject);
      }

    })



  }

}
