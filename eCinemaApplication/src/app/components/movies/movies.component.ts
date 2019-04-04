import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Movies } from 'src/app/objects/movies.object';
import { UserService } from 'src/app/shared/services/user.service';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  @ViewChild("rateInput") rateInput: ElementRef;


  movieComment: FormGroup;
  movieCommentPanelId :number=-1;





  demoMovie : Movies;
  demoMovie2 : Movies;
  moviesList = [] ;
  MovieObject : Movies = null;
  loggedInUser:boolean;

  constructor(private userService:UserService,private movieService : MoviesService,private router:Router,
    private activeRouter:ActivatedRoute) { 

      this.activeRouter.queryParams
      .subscribe(
        (queryParams: Params) => {
          if(queryParams['userStatus']!=null){
          this.loggedInUser=queryParams['userStatus'];
          console.log("user status "+this.loggedInUser);
          }else{
            this.loggedInUser =this.userService.isAuthenticated;
          }
        });
      
     
  }

  ngOnInit() {

    
    
    this.movieService.getAllMovies().subscribe((data : Movies[])=>{
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


    this.movieComment = new FormGroup({
      'movieCommentGroup': new FormGroup({
        'username': new FormControl(null, [Validators.required]),
        'rate': new FormControl(null),
        'comment': new FormControl(null, [Validators.required]),
      })
    });

  }

  clickMoviesCategoriesDropdown(){
    console.log("Button clicked");
    console.log("moviesCategoriesDropdown");
    this.moviesCategoriesDropdown = !this.moviesCategoriesDropdown;
  }


  public deleteMovie(id:number,position:number){
    console.log("Id:"+id+" position:"+position)
    this.movieService.deleteMovie(id).subscribe((data)=>{
      this.moviesList.splice(position,1);
    })
  }

  public updateMovie(movieItem:Movies,i: number){
    this.router.navigate(['newMovie'],{queryParams:{
      "mode": "edit",
      "id":movieItem.getMovieId(),
      "title": movieItem.getMovieTitle(),
      "directors": movieItem.getMovieDirector(),
      "actors": movieItem.getMovieActors(),
      "moviePictures": movieItem.getMoviePicture(),
      "summary": movieItem.getMovieSummary(),
      "type": movieItem.getMovieType(),
      "creationDate": movieItem.getMovieCreationDate(),
      "country": movieItem.getMovieCountry(),
    }})
  }

  public createNewMovie(){
    this.router.navigate(['newMovie'],{queryParams:{
      "mode": "new",
    }});
  }

  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

  onCommentSubmit(){
    this.movieComment.get('movieCommentGroup.rate').patchValue(this.rateInput.nativeElement.value)
    console.log(this.movieComment);
    this.movieCommentPanelId=-1;
    alert("Your comment has been delivered");
  }

  addUserComment(i){
    this.movieCommentPanelId = i;
  }

  closeCommentPanel(){
    this.movieCommentPanelId=-1;
  }
}
