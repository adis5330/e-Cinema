import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderService } from 'src/app/shared/services/header.service';
import { LeaveACommentService } from 'src/app/shared/services/leave-acomment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leava-comment',
  templateUrl: './leava-comment.component.html',
  styleUrls: ['./leava-comment.component.css']
})
export class LeavaCommentComponent implements OnInit {

 
  loggedInUser:boolean;
  signupForm: FormGroup;
  constructor(private userService:UserService,private headerService:HeaderService,private leaveACommentService:LeaveACommentService,
    private router:Router) { }

  ngOnInit() {
    this.loggedInUser =this.userService.isAuthenticated;
    this.headerService.enableSearchField.next(false);
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required]),
      
        'message': new FormControl(null, [Validators.required])
      })
    });
  }

  onSubmit(){
    this.leaveACommentService.saveComment(this.signupForm.get('userData.username').value,this.signupForm.get('userData.message').value)
    .subscribe((data:any)=>{
      alert("Your message has been deliverd. Thank you!!");
      this.router.navigate(['movies','all']);
    })
  }


}
