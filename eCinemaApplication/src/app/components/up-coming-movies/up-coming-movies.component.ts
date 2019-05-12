import { Component, OnInit } from '@angular/core';
import { UpcomingMoviesService } from 'src/app/shared/services/upcoming-movies.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Movies } from 'src/app/objects/movies.object';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { UpcomingMovie } from 'src/app/objects/upcomingMovie.object';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-up-coming-movies',
  templateUrl: './up-coming-movies.component.html',
  styleUrls: ['./up-coming-movies.component.css']
})
export class UpComingMoviesComponent implements OnInit {

  loggedInUser:boolean;
  moviesList = [] ;
  MovieObject : UpcomingMovie = null;
  sortedOption :string ="";
  adminLoggedInUser:boolean;
  constructor(private upComingMoviesService : UpcomingMoviesService,private userService:UserService,
    private activeRouter: ActivatedRoute,private movieService:MoviesService,private router:Router,
    private headerService:HeaderService) { }

  ngOnInit() {
    this.adminLoggedInUser =  this.userService.isAdmin;
    this.loggedInUser = this.userService.isAuthenticated;

   this.moviesList=[];

   this.activeRouter.params.subscribe(params => {
    this.sortedOption = params['type'];

    if(this.sortedOption!="" && this.sortedOption!="all"){
      console.log(this.sortedOption);
        this.moviesList=[];
        this.movieService.getMovieByCategoryForUpcomingMovies(this.sortedOption).subscribe((data:{actors:string,country:string,creationDate:string,director:string,id:string,moviePictures:string
          summary:string,title:string,type:string,showDay:string}[])=>{
            for (var i=0; i<data.length; i++) {
            this.MovieObject = new UpcomingMovie();
            this.MovieObject.setMovieId(+data[i].id);
            this.MovieObject.setMovieTitle(data[i].title);
            this.MovieObject.setMovieDirector(data[i].director);
            this.MovieObject.setMovieActors(data[i].actors);
            this.MovieObject.setMoviePicture(data[i].moviePictures);
            this.MovieObject.setMovieSummary(data[i].summary);
            this.MovieObject.setMovieType(data[i].type);
            this.MovieObject.setMovieCreationDate(data[i].creationDate);
            this.MovieObject.setMovieCountry(data[i].country);
            this.MovieObject.setShowDay(data[i].showDay);
            this.moviesList.push(this.MovieObject);
            }
          })
          
    }
 });


 if(this.sortedOption=="" || this.sortedOption=="all"){
  this.upComingMoviesService.getAllUpcomingMovies().subscribe((data : Movies[])=>{
     
      for (var i=0; i<data.length; i++) {
        this.MovieObject = new UpcomingMovie();
        this.MovieObject.setMovieId(data[i]['id']);
        this.MovieObject.setMovieTitle(data[i]['title']);
        this.MovieObject.setMovieDirector(data[i]['director']);
        this.MovieObject.setMovieActors(data[i]['actors']);
        this.MovieObject.setMoviePicture(data[i]['moviePictures']);
        this.MovieObject.setMovieSummary(data[i]['summary']);
        this.MovieObject.setMovieType(data[i]['type']);
        this.MovieObject.setMovieCreationDate(data[i]['creationDate']);
        this.MovieObject.setMovieCountry(data[i]['country']);
        this.MovieObject.setShowDay(data[i]['showDay']);
        this.moviesList.push(this.MovieObject);
      }

    })
  }

  this.headerService.enableSearchField.next(true);

  }


  
  public deleteUpcomingMovie(id:number,position:number){
      this.movieService.deleteUpcomingMovie(id).subscribe((data)=>{
      this.moviesList.splice(position,1);
    })
  }

  public updateUpcomingMovie(upcomingMovie:UpcomingMovie,i: number){
    this.router.navigate(['newUpcomingMovie'],{queryParams:{
      "mode": "edit",
      "id":upcomingMovie.getMovieId(),
      "title": upcomingMovie.getMovieTitle(),
      "directors": upcomingMovie.getMovieDirector(),
      "actors": upcomingMovie.getMovieActors(),
      "moviePictures": upcomingMovie.getMoviePicture(),
      "summary": upcomingMovie.getMovieSummary(),
      "type": upcomingMovie.getMovieType(),
      "creationDate": upcomingMovie.getMovieCreationDate(),
      "country": upcomingMovie.getMovieCountry(),
      "showDay": upcomingMovie.getShowDay()
    }})
  }

  public createNewUpcomingMovieMovie(){
    this.router.navigate(['newUpcomingMovie'],{queryParams:{
      "mode": "new",
    }});
  }

}
