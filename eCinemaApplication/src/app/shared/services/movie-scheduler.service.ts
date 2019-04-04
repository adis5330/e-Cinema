import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovieSchedulerService {

  constructor(private http : HttpClient) { }

  public getMovieScheduler() : Observable<any>{
    return null;
  }

}
