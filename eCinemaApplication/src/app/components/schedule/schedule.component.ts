import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { MovieScheduler } from 'src/app/objects/movieScheduler.object';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit,OnDestroy {
  
  loggedInUser:boolean;
  constructor(private userService:UserService,private movieService : MoviesService,
    private router:Router,private activeRouter:ActivatedRoute,private headerService:HeaderService) { }

  sheduledObject : MovieScheduler;
  scheduledMovies : MovieScheduler[] = [];
  adminLoggedInUser:boolean;

  ngOnInit() {


    this.loggedInUser =this.userService.isAuthenticated;
    this.headerService.enableSearchField.next(false);


    if(this.userService.isAuthenticated){
      console.log("Schedule "+this.userService.userObject.getUserType());
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


    this.movieService.getMoviesScheduling().subscribe((data: {
      id:number,
      date: string,
      time:string,
      room:string,
      movieTitle:string
    }[])=>{
      for (var i=0; i<data.length; i++) {
      this.sheduledObject = new MovieScheduler(data[i].id,data[i].movieTitle,data[i].room,data[i].date,data[i].time);
      this.scheduledMovies.push(this.sheduledObject);
    }
    });

  }

  public updateSchedule(scheduleObject:MovieScheduler){
    this.router.navigate(['newScheduleItem'],{queryParams:{
       "mode": "edit",
        "id":scheduleObject.getScheduleId(),
        "title":scheduleObject.getMovieTitle(),
        "time":scheduleObject.getMovieTime(),
        "room":scheduleObject.getMovieRoom(),
        "date":scheduleObject.getDate(),
       
    }})
  }

  public deleteScheduleItem(id:number,position:number){

    this.movieService.deleteSchedule(id).subscribe((data)=>{
      this.scheduledMovies.splice(position,1);
    })
  }
  createNewSchedule(){
    this.router.navigate(['newScheduleItem'],{queryParams:{
      "mode": "new",
    }});
  }



  ngOnDestroy(): void {
    console.log("On destroy "+this.userService.userObject);
    if(this.userService.userObject==null){

      this.adminLoggedInUser=false;
      this.loggedInUser=false;
    }
  }
}
