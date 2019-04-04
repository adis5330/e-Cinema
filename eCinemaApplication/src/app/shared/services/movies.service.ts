import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movies } from 'src/app/objects/movies.object';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {
   httpOptions = {headers:new HttpHeaders({ 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'})};
   MoviesList : Movies[];

  constructor(private http : HttpClient) {
   }


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


}
