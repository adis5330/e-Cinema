import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, NgModel, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/objects/user.object';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories = [
    'Action',
    'Comedy',
    'Thriller',
    'Drama',
    'Documentary'
]

authenticationForm: FormGroup;
userObject : User;
loggedInUserId:String = "empty";

@ViewChild('closeAuthenticationPanel') emailInput:ElementRef;
@ViewChild('openRegisterPanel') openRegisterPanelBtn:ElementRef;

forbiddenUsernames = ['Chris', 'Anna'];

  constructor(private userService : UserService,private router:Router) { }

  ngOnInit() {
    this.authenticationForm = new FormGroup({
      'userData': new FormGroup({
        'email': new FormControl(null, [Validators.required]),
        'password': new FormControl(null, [Validators.required])
      })
    });
  }

  onSubmit(formData  : NgForm){
      console.log(formData);
      let el: HTMLElement = this.emailInput.nativeElement as HTMLElement;
      this.userService.authenticateUser(this.authenticationForm.get('userData.email').value,
      this.authenticationForm.get('userData.password').value).subscribe((data:any)=>{
          if(data===null){
            alert("You Insert invalid credentials.Please try again")
          }else{
        
            this.userService.saveUser(data);
            el.click();
            this.userObject = this.userService.getLoggInUser();
            sessionStorage.setItem("userId", this.userObject.getUserId().toString());
            this.loggedInUserId = sessionStorage.getItem("userId");
            this.userService.authenticatdUser.next(true);
            this.userService.isAuthenticated=true;
            this.router.navigate(['movies'],{queryParams : {
              "userStatus": true 
            }});

          }

    },(error:HttpErrorResponse) =>{
     
    });


  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  logOutUser(){
    sessionStorage.removeItem("userId");
    this.userService.isAuthenticated=false;
    this.loggedInUserId="empty";
    this.router.navigate(['movies']);
  }


}
