import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-new-upcoming-movie',
  templateUrl: './new-upcoming-movie.component.html',
  styleUrls: ['./new-upcoming-movie.component.css']
})
export class NewUpcomingMovieComponent implements OnInit {

  
  MovieData: FormGroup;

  movieTypesArray = [
    'Action',
    'Comedy',
    'Thriller',
    'Drama',
    'Documentary'
  ];

  mode: String ="";
  UpcomingmovieObject : 

  { 
    id:String,
    title:String,
    directors:String,
    actors:String,
    moviePictures:String,
    summary:String,
    type:String,
    creationDate:String,
    country:String,
    showDay:String
  
  };
    loggedInUser:boolean;


    
  constructor(private movieService : MoviesService,  private route: ActivatedRoute,private router:Router
    ,private userService:UserService,private headerService:HeaderService) { }

  ngOnInit() {
    this.loggedInUser =this.userService.isAuthenticated;
    this.headerService.enableSearchField.next(false);

    this.route.queryParams
    .subscribe(
      (queryParams: Params) => {
        this.mode = queryParams['mode'];
        if(queryParams['mode']=='edit'){
            this.UpcomingmovieObject = {
              'id' : queryParams['id'],
              "title":queryParams['title'],
              "directors": queryParams['directors'],
              "actors": queryParams['actors'],
              "moviePictures": queryParams['moviePictures'],
              "summary":  queryParams['summary'],
              "type":queryParams['type'],
              "creationDate":queryParams['creationDate'],
              "country": queryParams['country'],
              "showDay": queryParams['showDay']
              
            }
        }
      }
    );



    if(this.mode=='edit'){
      this.MovieData = new FormGroup({
        'movieData': new FormGroup({
          'title': new FormControl(this.UpcomingmovieObject.title, [Validators.required]),
          'directors': new FormControl(this.UpcomingmovieObject.directors, [Validators.required]),
          'actors': new FormControl(this.UpcomingmovieObject.actors, [Validators.required]),
          'image': new FormControl(this.UpcomingmovieObject.moviePictures, [Validators.required]),
          'summary': new FormControl(this.UpcomingmovieObject.summary, [Validators.required]),
          'movieType': new FormControl(this.movieTypesArray[0], [Validators.required]),
          'creationDate': new FormControl(this.UpcomingmovieObject.creationDate, [Validators.required]),
          'country': new FormControl(this.UpcomingmovieObject.country, [Validators.required]),
          'showDay': new FormControl(this.UpcomingmovieObject.showDay,[Validators.required])
        })
      });
    }else if(this.mode=='new'){
      this.MovieData = new FormGroup({
        'movieData': new FormGroup({
          'title': new FormControl(null, [Validators.required]),
          'directors': new FormControl(null, [Validators.required]),
          'actors': new FormControl(null, [Validators.required]),
          'image': new FormControl(null, [Validators.required]),
          'summary': new FormControl(null, [Validators.required]),
          'movieType': new FormControl(this.movieTypesArray[0], [Validators.required]),
          'creationDate': new FormControl(null, [Validators.required]),
          'country': new FormControl(null, [Validators.required]),
          'showDay': new FormControl(null,[Validators.required])
        })
      });
    }
    
  }

  public onSubmit():void{
    if(this.mode=='edit'){
    this.movieService.saveOrUpdateUpcomingMovie({
     'id' : this.UpcomingmovieObject.id,
     'title': this.MovieData.get('movieData.title').value,
     'directors': this.MovieData.get('movieData.directors').value,
     'actors': this.MovieData.get('movieData.actors').value,
     'moviePictures': this.MovieData.get('movieData.image').value,
     'summary': this.MovieData.get('movieData.summary').value,
     'type': this. MovieData.get('movieData.movieType').value,
     'creationDate': this. MovieData.get('movieData.creationDate').value,
     'country': this. MovieData.get('movieData.country').value,
     'showDay': this.MovieData.get('movieData.showDay').value
    },this.mode).subscribe((data:any)=>{
      console.log(data);
      alert("The movies has been created!");
      this.router.navigate(['upcomingMovies','all']);
    });
  }else{
    this.movieService.saveOrUpdateUpcomingMovie({
      'id' : "",
      'title': this.MovieData.get('movieData.title').value,
      'directors': this.MovieData.get('movieData.directors').value,
      'actors': this.MovieData.get('movieData.actors').value,
      'moviePictures': this.MovieData.get('movieData.image').value,
      'summary': this.MovieData.get('movieData.summary').value,
      'type': this. MovieData.get('movieData.movieType').value,
      'creationDate': this. MovieData.get('movieData.creationDate').value,
      'country': this. MovieData.get('movieData.country').value,
      'showDay': this.MovieData.get('movieData.showDay').value
     },this.mode).subscribe((data:any)=>{
       console.log(data);
       alert("The movies has been updated!");
       this.router.navigate(['upcomingMovies','all']);
     });
  }
   
  }


}
