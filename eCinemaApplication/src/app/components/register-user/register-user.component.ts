import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { HeaderService } from 'src/app/shared/services/header.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/objects/user.object';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  loggedInUser:boolean;
  constructor(private userService:UserService,private headerService:HeaderService,private router:Router) { }
  
  userObject : User;
  loggedInUserId:String = "empty";
  signupForm: FormGroup;
  
  ngOnInit() {
    this.loggedInUser =this.userService.isAuthenticated;

    this.headerService.enableSearchField.next(false);


    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required]),
        'lastName':new FormControl(null, [Validators.required]),
        'telephone': new FormControl(null, [Validators.required]),
        'password': new FormControl(null, [Validators.required]),
        'birth': new FormControl(null, [Validators.required])
      })
    });
  }

  onSubmit(){
    
      this.userService.registerUser(
        this.signupForm.get('userData.username').value,
        this.signupForm.get('userData.password').value,
        this.signupForm.get('userData.lastName').value,
        this.signupForm.get('userData.telephone').value,
        this.signupForm.get('userData.birth').value,
        this.signupForm.get('userData.email').value
    
    ).subscribe((data:any)=>{
      if(data===null){
        alert("You Insert invalid credentials.Please try again")
      }else{
        console.log(data.email);
        this.userService.saveUser(data);
        this.userObject = this.userService.getLoggInUser();
        console.log(this.userObject.getEmail());
        sessionStorage.setItem("userId", this.userObject.getUserId().toString());
        
        this.userService.authenticatdUser.next(data);
        this.userService.isAuthenticated=true;
        this.userService.isAuthenticatedObservable.next(true)
        this.router.navigate(['movies','all']);
        
        alert("the user "+ this.signupForm.get('userData.username').value+" has been created")

      }

        },(error:HttpErrorResponse) =>{
        
        });
  }
  


}
