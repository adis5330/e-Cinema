import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movies } from 'src/app/objects/movies.object';
import { Observable, Subject } from 'rxjs';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { isObject } from 'util';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {
   httpOptions = {headers:new HttpHeaders({ 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'})};
   MoviesList : Movies[];

   addMoviesCategoriesTrigger  = new Subject<boolean>();



  constructor(private http : HttpClient,private router:Router) {
   }


    searchContent  = new Subject<{actors:string,country:string,creationDate:string,director:string,id:string,moviePictures:string
    summary:string,title:string,type:string}>();
    searchButtonClicked  = new Subject<boolean>();
    searchContentByCategory = new Subject<{actors:string,country:string,creationDate:string,director:string,id:string,moviePictures:string
      summary:string,title:string,type:string}>();

   public getAllMovies() :Observable<any> {
     return  <Observable<any>> this.http.get('http://e-cinema.000webhostapp.com/getMovies.php',this.httpOptions);
  }

  public saveOrUpdateMovie( 
    data : 
    { 
      id :String,
      title:String,
      directors:String,
      actors:String,
      moviePictures:String,
      summary:String,
      type:String,
      creationDate:String,
      country:String},mode:String) :Observable<any>{
        if(mode=='new'){
      return this.http.post('http://e-cinema.000webhostapp.com/createMovie.php', {
        "title": data.title,
        "directors": data.directors,
        "actors": data.actors,
        "moviePictures": data.moviePictures,
        "summary": data.summary,
        "type": data.type,
        "creationDate": data.creationDate,
        "country": data.country,
        
      }
      ,this.httpOptions);
    }else{
      return this.http.post('http://e-cinema.000webhostapp.com/updateMovies.php', {
        "id":data.id,
        "title": data.title,
        "directors": data.directors,
        "actors": data.actors,
        "moviePictures": data.moviePictures,
        "summary": data.summary,
        "type": data.type,
        "creationDate": data.creationDate,
        "country": data.country,
        
      }
      ,this.httpOptions);
    }
    
  }

  public deleteMovie(id:number) :Observable<any> {

    return this.http.post('http://e-cinema.000webhostapp.com/deleteMovies.php', {
      "movieId": id,
    }
    ,this.httpOptions);
  }


  public deleteUpcomingMovie(id:number) :Observable<any> {

    return this.http.post('http://e-cinema.000webhostapp.com/deleteUpcomingMovies.php', {
      "Id": id,
    }
    ,this.httpOptions);
  }

  public saveOrUpdateScheduleItem( 
    data : 
    { 
      id :String,
      title:String,
      time:String,
      room:String,
      date:String,
       },mode:String) :Observable<any>{
        if(mode=='new'){
      return this.http.post('http://e-cinema.000webhostapp.com/createMoviesTime.php', {
        "title": data.title,
        "time": data.time,
        "room": data.room,
        "date": data.date,
       
        
      }
      ,this.httpOptions);
    }else{
      return this.http.post('http://e-cinema.000webhostapp.com/updateScheduleItem.php', {
        "id":data.id,
        "movieTitle": data.title,
        "movieTime": data.time,
        "movieRoom": data.room,
        "movieDate": data.date,
      }
      ,this.httpOptions);
    }
  
  }







  public deleteSchedule(id:number) :Observable<any> {
    console.log("THe schedule id "+ id);
    return this.http.post('http://e-cinema.000webhostapp.com/deleteScheduleItem.php', {
      "scheduleItemId": id,
    }
    ,this.httpOptions);
  }


  public searchForMovies(searchContent:string):Promise<any>{
    const moviesAttributes = [
      "title",
      "directos",
      "actors",
      "date"
    ]
    if(searchContent.split(",").length!=0){
       if(searchContent.split(",").length==1){
         return  this.getMovieByAttribute("title",searchContent.split(",")[0]).then((data:boolean)=>{
          if((data==true) || isObject(data)){
            return  this.http.get("http://e-cinema.000webhostapp.com/searchMovies.php?title="+searchContent.split(",")[0]
            +"&actors=",this.httpOptions);
          }else{
            console.log("Is not 1")
            return this.getMovieByAttribute("actors",searchContent.split(",")[0]).then((data:boolean)=>{

                if(data==true || data!=null){
                  return  this.http.get("http://e-cinema.000webhostapp.com/searchMovies.php?title=&actors="+searchContent.split(",")[0],this.httpOptions);
                }else{

                }
              });
          }
         })

       }else if(searchContent.split(",").length==2){
         console.log("Search " +searchContent.split(",")[0] + " "+searchContent.split(",")[1]);
        return  this.http.get("http://e-cinema.000webhostapp.com/searchMovies.php?title="+searchContent.split(",")[0]
        +"&actors="+searchContent.split(",")[1],this.httpOptions).toPromise().then((data:boolean)=>{
          if(data==true || data!=null){
            return  this.http.get("http://e-cinema.000webhostapp.com/searchMovies.php?title="+searchContent.split(",")[0]
            +"&actors="+searchContent.split(",")[1],this.httpOptions);
          }});
       }
             
          
    }



  }  

  public getMovieByAttribute(var1:string,var2:string){
    return new Promise(resolve=>{
      this.http.get("http://e-cinema.000webhostapp.com/getMovieByAttribute.php?var1="+var1+"&var2="+var2
      ,this.httpOptions).subscribe(
          (data:any) => { 
              resolve (data);
            
       });
    });

  }



  public getMovieByCategory(var1:string) : Observable<any>{
    return  this.http.get("http://e-cinema.000webhostapp.com/getMoviesByCategory.php?type="+var1
      ,this.httpOptions);

  }

  public getMovieByCategoryForUpcomingMovies(var1:string) : Observable<any>{
    return  this.http.get("http://e-cinema.000webhostapp.com/getUpcomingMoviesByCategory.php?type="+var1
      ,this.httpOptions);

  }
  public getSearchMovies():Observable<any>{
    return this.searchContent.asObservable();
  }


  public getMoviesScheduling(): Observable<any>{
   
      return  this.http.get("http://e-cinema.000webhostapp.com/getMoviesTime.php?"
        ,this.httpOptions);

    
  }

  public saveOrUpdateUpcomingMovie( 
    data : 
    { 
      id :String,
      title:String,
      directors:String,
      actors:String,
      moviePictures:String,
      summary:String,
      type:String,
      creationDate:String,
      country:String,
      showDay:String
    
     },mode:String) :Observable<any>{

      console.log("UPCOMING MOVIE")

        if(mode=='new'){
      return this.http.post('http://e-cinema.000webhostapp.com/createUpcomingMovie.php', {
        "title": data.title,
        "directors": data.directors,
        "actors": data.actors,
        "moviePictures": data.moviePictures,
        "summary": data.summary,
        "type": data.type,
        "creationDate": data.creationDate,
        "country": data.country,
        "showDay":data.showDay
        
      }
      ,this.httpOptions);
    }else{
      return this.http.post('http://e-cinema.000webhostapp.com/updateUpcomingMovie.php', {
        "id":data.id,
        "title": data.title,
        "directors": data.directors,
        "actors": data.actors,
        "moviePictures": data.moviePictures,
        "summary": data.summary,
        "type": data.type,
        "creationDate": data.creationDate,
        "country": data.country,
        "showDay":data.showDay
        
      }
      ,this.httpOptions);
    }
    
  }

  public addMovieCategory(category:string):Observable<any>{
      return this.http.post('http://e-cinema.000webhostapp.com/addCategory.php', {
        "category": category, 
      }
      ,this.httpOptions);
  }

  public getMovieCategories():Observable<any>{
    return this.http.get('http://e-cinema.000webhostapp.com/getCategories.php',
    this.httpOptions);
}



}
