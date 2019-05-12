import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaveACommentService {
  httpOptions = {headers:new HttpHeaders({ 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'})};
  constructor(private http : HttpClient) { }

  public saveComment(userName:string,message:string) :Observable<any> {
    return  this.http.get('http://e-cinema.000webhostapp.com/addComment.php?user='+userName+'&comment='+message,this.httpOptions);
 }
 public getAllComments() :Observable<any> {
  return   this.http.get('http://e-cinema.000webhostapp.com/getAllComments.php',this.httpOptions);
}


}
