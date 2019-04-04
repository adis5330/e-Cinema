import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from 'src/app/objects/user.object';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }
  userObject : User;
  isAuthenticated

  authenticatdUser = new Subject<boolean>()





  public authenticateUser(userNameOrEmail:string, userPassword:string):Observable<any>{
  
    const httpOptions = {headers:new HttpHeaders({ 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'})};
   return this.http.post('https://e-cinema.000webhostapp.com/getUser.php',  {
        "email":userNameOrEmail,
        "password":userPassword
        }
    ,httpOptions);

   


    
  }

  public saveUser(
   data : {id:number,name:string,lastName:string,email:string,telephone:String,password:string,birth:string,userType:string}
  ):void{
    this.userObject = new User();
   
    this.userObject.setUserName(data.name);
    this.userObject.setUserLastName(data.lastName);
    this.userObject.setEmail(data.email);
    this.userObject.setUserTelephone(data.telephone);
    this.userObject.setUserPassword(data.password);
    this.userObject.setUserBirth(data.birth);
    this.userObject.setUserType(data.userType);
  }

  public getLoggInUser() :User{
    return this.userObject;
  }

}
