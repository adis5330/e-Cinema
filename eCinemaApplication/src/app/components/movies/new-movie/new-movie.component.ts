import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Movies } from 'src/app/objects/movies.object';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit {

  MovieData: FormGroup;

  movieTypesArray = [
    'Action',
    'Comedy',
    'Thriller',
    'Drama',
    'Documentary'
  ];

  mode: String ="";
  movieObject : 

  { 
    id:String,
    title:String,
    directors:String,
    actors:String,
    moviePictures:String,
    summary:String,
    type:String,
    creationDate:String,
    country:String};
    loggedInUser:boolean;


    
  constructor(private movieService : MoviesService,  private route: ActivatedRoute,private router:Router
    ,private userService:UserService) { }

  ngOnInit() {
    this.loggedInUser =this.userService.isAuthenticated;


    this.route.queryParams
    .subscribe(
      (queryParams: Params) => {
        this.mode = queryParams['mode'];
        if(queryParams['mode']=='edit'){
            this.movieObject = {
              'id' : queryParams['id'],
              "title":queryParams['title'],
              "directors": queryParams['directors'],
              "actors": queryParams['actors'],
              "moviePictures": queryParams['moviePictures'],
              "summary":  queryParams['summary'],
              "type":queryParams['type'],
              "creationDate":queryParams['creationDate'],
              "country": queryParams['country'],
              
            }
        }
      }
    );



    if(this.mode=='edit'){
      this.MovieData = new FormGroup({
        'movieData': new FormGroup({
          'title': new FormControl(this.movieObject.title, [Validators.required]),
          'directors': new FormControl(this.movieObject.directors, [Validators.required]),
          'actors': new FormControl(this.movieObject.actors, [Validators.required]),
          'image': new FormControl(this.movieObject.moviePictures, [Validators.required]),
          'summary': new FormControl(this.movieObject.summary, [Validators.required]),
          'movieType': new FormControl(this.movieTypesArray[0], [Validators.required]),
          'creationDate': new FormControl(this.movieObject.creationDate, [Validators.required]),
          'country': new FormControl(this.movieObject.country, [Validators.required])
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
          'country': new FormControl(null, [Validators.required])
        })
      });
    }
    
  }

  public onSubmit():void{
    if(this.mode=='edit'){
    this.movieService.saveOrUpdateMovie({
     'id' : this.movieObject.id,
     'title': this.MovieData.get('movieData.title').value,
     'directors': this.MovieData.get('movieData.directors').value,
     'actors': this.MovieData.get('movieData.actors').value,
     'moviePictures': this.MovieData.get('movieData.image').value,
     'summary': this.MovieData.get('movieData.summary').value,
     'type': this. MovieData.get('movieData.movieType').value,
     'creationDate': this. MovieData.get('movieData.creationDate').value,
     'country': this. MovieData.get('movieData.country').value
    },this.mode).subscribe((data:any)=>{
      console.log(data);
      alert("The movies has been created!");
      this.router.navigate(['movies']);
    });
  }else{
    this.movieService.saveOrUpdateMovie({
      'id' : "",
      'title': this.MovieData.get('movieData.title').value,
      'directors': this.MovieData.get('movieData.directors').value,
      'actors': this.MovieData.get('movieData.actors').value,
      'moviePictures': this.MovieData.get('movieData.image').value,
      'summary': this.MovieData.get('movieData.summary').value,
      'type': this. MovieData.get('movieData.movieType').value,
      'creationDate': this. MovieData.get('movieData.creationDate').value,
      'country': this. MovieData.get('movieData.country').value
     },this.mode).subscribe((data:any)=>{
       console.log(data);
       alert("The movies has been updated!");
       this.router.navigate(['movies']);
     });
  }
   
  }




}
