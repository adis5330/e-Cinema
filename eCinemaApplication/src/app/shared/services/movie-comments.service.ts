import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movies } from 'src/app/objects/movies.object';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovieCommentsService {
  httpOptions = {headers:new HttpHeaders({ 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'})};
  constructor(private http : HttpClient) { }

  public getAllMovies() :Observable<any> {
    return  <Observable<any>> this.http.get('http://e-cinema.000webhostapp.com/getMovies.php',this.httpOptions);
 }

 public saveCommentToMovie(commentObject:{comment:string,userName:string,rate:number,movieId:number}) :Observable<any> {
  console.log(commentObject.comment)
  console.log(commentObject.userName)
  console.log(commentObject.rate)
  console.log(commentObject.movieId)
  return this.http.post('http://e-cinema.000webhostapp.com/createMovieComments.php', {
    "comment":commentObject.comment,
    "userName":commentObject.userName,
    "rate":commentObject.rate,
    "movieId":commentObject.movieId

  }
  ,this.httpOptions);
}


}


