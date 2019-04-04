import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpcomingMoviesService {

  httpOptions = {headers:new HttpHeaders({ 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'})};

  constructor(private http : HttpClient) { 
  }

  public getAllUpcomingMovies() :Observable<any> {
    return  <Observable<any>> this.http.get('http://e-cinema.000webhostapp.com/getUpcomingMovies.php',this.httpOptions);
 }
}
