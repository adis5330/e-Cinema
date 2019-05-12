import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  loggedInUser:boolean;
  constructor(private userService:UserService,private headerService:HeaderService) { }

  ngOnInit() {
    this.loggedInUser =this.userService.isAuthenticated;
    this.headerService.enableSearchField.next(false);
  }


}
