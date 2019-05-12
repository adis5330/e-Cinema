import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.css']
})
export class NewScheduleComponent implements OnInit {

  
  MovieData: FormGroup;

 

  mode: String ="";
  scheduleMovieObject : 
  { 
    id:String,
    title:String,
    time:String,
    room:String,
    date:String,
   };
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
            this.scheduleMovieObject = {
              'id' : queryParams['id'],
              "title":queryParams['title'],
              "time": queryParams['time'],
              "room": queryParams['room'],
              "date": queryParams['date'],
             
              
            }
        }
      }
    );



    if(this.mode=='edit'){
      this.MovieData = new FormGroup({
        'movieData': new FormGroup({
          'title': new FormControl(this.scheduleMovieObject.title, [Validators.required]),
          'date': new FormControl(this.scheduleMovieObject.date, [Validators.required]),
          'room': new FormControl(this.scheduleMovieObject.room, [Validators.required]),
          'time': new FormControl(this.scheduleMovieObject.time, [Validators.required]),
         
        })
      });
    }else if(this.mode=='new'){
      this.MovieData = new FormGroup({
        'movieData': new FormGroup({
          'title': new FormControl(null, [Validators.required]),
          'date': new FormControl(null, [Validators.required]),
          'room': new FormControl(null, [Validators.required]),
          'time': new FormControl(null, [Validators.required]),
          
        })
      });
    }
    
  }

  public onSubmit():void{
    if(this.mode=='edit'){
    this.movieService.saveOrUpdateScheduleItem({
     'id' : this.scheduleMovieObject.id,
     'title': this.MovieData.get('movieData.title').value,
     'time': this.MovieData.get('movieData.time').value,
     'room': this.MovieData.get('movieData.room').value,
     'date': this.MovieData.get('movieData.date').value,
    },this.mode).subscribe((data:any)=>{
      alert("The schedule item has been updated");
      this.router.navigate(['schedule']);
    });
  }else{
    this.movieService.saveOrUpdateScheduleItem({
      'id' : "",
      'title': this.MovieData.get('movieData.title').value,
      'time': this.MovieData.get('movieData.time').value,
      'room': this.MovieData.get('movieData.room').value,
      'date': this.MovieData.get('movieData.date').value,
     },this.mode).subscribe((data:any)=>{
       
       alert("The schedule item has been created");
       this.router.navigate(['schedule']);
     });
  }
   
  }


}
