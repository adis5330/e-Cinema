import { Component, OnInit } from '@angular/core';
import { UserComments } from 'src/app/objects/userComments.object';
import { LeaveACommentService } from 'src/app/shared/services/leave-acomment.service';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-leave-acomment-page',
  templateUrl: './leave-acomment-page.component.html',
  styleUrls: ['./leave-acomment-page.component.css']
})
export class LeaveACommentPageComponent implements OnInit {

  userCommentsTable : UserComments[] = []
  userCommentObject : UserComments;


  constructor(private leaveACommentsService:LeaveACommentService,private headerService:HeaderService) { }

  ngOnInit() {
    this.leaveACommentsService.getAllComments().subscribe((data:{user:string,comment:string}[])=>{
      console.log("fdsfds"+data.length);
      for (var i=0; i<data.length; i++) {
        this.userCommentObject = new UserComments(data[i].user,data[i].comment);
        this.userCommentsTable.push(this.userCommentObject);
      }

    })

    this.headerService.enableSearchField.next(false);
  }

}
