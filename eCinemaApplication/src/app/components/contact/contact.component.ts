import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  loggedInUser:boolean;
  constructor(private userService:UserService,private headerService:HeaderService) { }
  
  forbiddenUsernames = ['Chris', 'Anna'];
  
  signupForm: FormGroup;
  
  ngOnInit() {
    this.loggedInUser =this.userService.isAuthenticated;

    this.headerService.enableSearchField.next(false);


    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required]),
        'message':new FormControl(null, [Validators.required])
      })
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


}
