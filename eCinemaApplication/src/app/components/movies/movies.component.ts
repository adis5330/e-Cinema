import { Component, OnInit } from '@angular/core';
import { Movies } from 'src/app/objects/movies.object';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  moviesCategoriesDropdown : boolean =false;

  categories = [
      'Action',
      'Comedy',
      'Thriller',
      'Drama',
      'Documentary'
  ]

  demoMovie : Movies;


  constructor() { 

    this.demoMovie = new Movies();

      this.demoMovie.setMovieId(1);
      this.demoMovie.setMovieTitle("Once upon a time");
      this.demoMovie.setMovieActors("Brad,Ang,LLL,LLL,LLL,LLL,LLL,LLL,LLL,LLL,LLL,LLL,LLL,LLL,LLL,LLL,LLL");
      this.demoMovie.setMovieDirector("Peter Jackson");
      this.demoMovie.setMovieCountry("England");
      this.demoMovie.setMovieSummary("Once upon a time in a fairytaleOnce upon a time in a fairytaleOnce upon a time in a fairytaleOnce upon a time in a fairytaleOnce upon a time in a fairytalfairytaleOnce upon a time in a fairytalfairytaleOnce upon a time in a fairytalfairytaleOnce upon a time in a fairytalfairytaleOnce upon a time in a fairytale");
      this.demoMovie.setMovieCreationDate("10-01-1967");
      this.demoMovie.setMovieType("Drame");
      this.demoMovie.setMoviePicture("https://boygeniusreport.files.wordpress.com/2015/10/lord-of-the-rings.jpg?quality=98&strip=all&w=782");
  }

  ngOnInit() {
  }

  clickMoviesCategoriesDropdown(){
    console.log("Button clicked");
    console.log("moviesCategoriesDropdown");
    this.moviesCategoriesDropdown = !this.moviesCategoriesDropdown;
  }


}
