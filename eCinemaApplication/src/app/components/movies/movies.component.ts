import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Movies } from 'src/app/objects/movies.object';
import { UserService } from 'src/app/shared/services/user.service';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MovieCommentsService } from 'src/app/shared/services/movie-comments.service';
import { MovieComments } from 'src/app/objects/movieComments.object';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  moviesCategoriesDropdown : boolean =false;

  categories  = []

  @ViewChild("rateInput") rateInput: ElementRef;
  @ViewChild("commentsMovieTitle") commentMovieTitle: ElementRef;
  
  movieComment: FormGroup;
  movieCommentPanelId :number=-1;





  demoMovie : Movies;
  demoMovie2 : Movies;
  moviesList = [] ;
  SearchmoviesList = [] ;
  MovieObject : Movies = null;
  loggedInUser:boolean=false;
  adminLoggedInUser:boolean=false;
  sortedOption :string ="";

  constructor(private userService:UserService,private movieService : MoviesService,private router:Router,
    private activeRouter:ActivatedRoute, private movieCommentsInterview:MovieCommentsService,private renderer: Renderer2,
    private headerService:HeaderService) { 
   
   
      this.activeRouter.params.subscribe(params => {
        this.sortedOption = params['type'];
        if(this.sortedOption!="" && this.sortedOption!="all"){
            this.moviesList=[];
            this.movieService.getMovieByCategory(this.sortedOption).subscribe((data:{actors:string,country:string,creationDate:string,director:string,id:string,moviePictures:string
              summary:string,title:string,type:string}[])=>{
                for (var i=0; i<data.length; i++) {
                this.MovieObject = new Movies();
                this.MovieObject.setMovieId(+data[i].id);
                this.MovieObject.setMovieTitle(data[i].title);
                this.MovieObject.setMovieDirector(data[i].director);
                this.MovieObject.setMovieActors(data[i].actors);
                this.MovieObject.setMoviePicture(data[i].moviePictures);
                this.MovieObject.setMovieSummary(data[i].summary);
                this.MovieObject.setMovieType(data[i].type);
                this.MovieObject.setMovieCreationDate(data[i].creationDate);
                this.MovieObject.setMovieCountry(data[i].country);
               
                this.moviesList.push(this.MovieObject);
                }
              })
              
        }
     });

     this.userService.authenticatdUser.subscribe((data:{id :number,name:string,lastName:string,email:string,telephone:string,password:string,birth:string,userType:string})=>{
      if(data.userType  =="admin"){
        this.adminLoggedInUser=true;
        this.userService.isAdmin=true;
        this.loggedInUser = true;
        }else{
          this.loggedInUser = true;
        
        }
     }) 

     this.userService.isAuthenticatedObservable.subscribe((data:boolean)=>{
      this.adminLoggedInUser=data;
      
     })

     
     if(this.userService.isAuthenticated){
       console.log(this.userService.userObject.getUserType());
       if(this.userService.userObject.getUserType()=="admin"){
      this.adminLoggedInUser=true;
      this.userService.isAdmin=true;
       }
     }else if(this.userService.isAuthenticated){
       if(this.userService.userObject.getUserType()!="admin"){
    
      this.loggedInUser=true;
       }
     }else if(!this.userService.isAuthenticated){
      this.adminLoggedInUser=false;
      this.userService.isAdmin=false;
      this.loggedInUser=false;
     }
     this.headerService.enableSearchField.next(true);
    
  }

  ngOnInit() {

    
    
    if(this.sortedOption=="" || this.sortedOption=="all"){
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
    }

    this.movieService.searchButtonClicked.subscribe((data:boolean)=>{
      if(data==true){
        this.SearchmoviesList=[];
      }
    })


    this.movieService.getSearchMovies().subscribe((data:{actors:string,country:string,creationDate:string,director:string,id:string,moviePictures:string
      summary:string,title:string,type:string})=>{
        this.MovieObject = new Movies();
        this.MovieObject.setMovieId(+data.id);
        this.MovieObject.setMovieTitle(data.title);
        this.MovieObject.setMovieDirector(data.director);
        this.MovieObject.setMovieActors(data.actors);
        this.MovieObject.setMoviePicture(data.moviePictures);
        this.MovieObject.setMovieSummary(data.summary);
        this.MovieObject.setMovieType(data.type);
        this.MovieObject.setMovieCreationDate(data.creationDate);
        this.MovieObject.setMovieCountry(data.country);
        this.SearchmoviesList.push(this.MovieObject);
        this.moviesList = this.SearchmoviesList;
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

  onCommentSubmit(movieId:number){
    console.log("Data + "+ movieId )+" "+this.movieComment.get('movieCommentGroup.comment').value;
    this.movieCommentPanelId=-1;
    this.movieCommentsInterview.saveCommentToMovie(
      {
      "comment":this.movieComment.get('movieCommentGroup.comment').value, 
      "userName" :this.movieComment.get('movieCommentGroup.username').value,
      "rate" : +this.rateInput.nativeElement.value,
      "movieId": +movieId
    }).subscribe((data:any)=>{
      console.log(data);
      alert("the comment has been created");
      this.clearCommentTable();
    })
  }

  addUserComment(i){
    this.movieCommentPanelId = i;
  }

  closeCommentPanel(){
    this.movieCommentPanelId=-1;
  }


  MovieCommentTable : MovieComments[] = [];
  MovieCommentObject : MovieComments;
  commentMovie : Movies

  getMovieComments(movieId:number, index :number){
    this.commentMovie = this.moviesList[index];
    this.renderer.setProperty(this.commentMovieTitle.nativeElement, 'innerHTML', this.commentMovie.getMovieTitle()+" Comments"); ;
    this.movieCommentsInterview.getMovieComments(movieId).subscribe((data:MovieComments[])=>{
      for (var i=0; i<data.length; i++) {
        this.MovieCommentObject = new MovieComments();
        this.MovieCommentObject.setCommentId(data[i]['id']);
        this.MovieCommentObject.setComment(data[i]['comment']);
        this.MovieCommentObject.setUserName(data[i]['userName']);
        this.MovieCommentObject.setRate(data[i]['rate']);
        this.MovieCommentObject.setMovieId(data[i]['movieId']);
        this.MovieCommentTable.push(this.MovieCommentObject);
      }

    });
  }
 
  clearCommentTable(){
    this.MovieCommentTable = [];
  }

}
  