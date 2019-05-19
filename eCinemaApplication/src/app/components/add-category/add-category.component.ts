import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { HeaderService } from 'src/app/shared/services/header.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit,OnDestroy {

  loggedInUser:boolean;
  constructor(private userService:UserService,private headerService:HeaderService,
    private movieService:MoviesService,private router:Router) { }
    adminLoggedInUser:boolean;
  categoryDataForm: FormGroup;
  
  ngOnInit() {
    this.loggedInUser =this.userService.isAuthenticated;
    this.headerService.enableSearchField.next(false);

    if(this.userService.isAuthenticated){
    
      if(this.userService.userObject.getUserType()=="admin"){
     this.adminLoggedInUser=true;
     this.userService.isAdmin=true;
      }
    }else if(this.userService.isAuthenticated){
      if(this.userService.userObject.getUserType()!="admin"){
     this.loggedInUser=true;
      }
    }else if(!this.userService.isAuthenticated){
     this.adminLoggedInUser=false;
     this.userService.isAdmin=false;
     this.loggedInUser=false;
    }

    this.categoryDataForm = new FormGroup({
      'categoryData': new FormGroup({
        'category': new FormControl(null, [Validators.required])
      })
    });
  }

  onSubmit(){
   
    this.movieService.addMovieCategory(this.categoryDataForm.get('categoryData.category').value).subscribe((data:any)=>{
        alert("The category has been created");
        this.movieService.addMoviesCategoriesTrigger.next(true);
        this.router.navigate(['']);
    })
  }


  ngOnDestroy(): void {
    console.log("On up cominng destroy "+this.userService.userObject);
    if(this.userService.userObject==null){
      this.userService.isAdmin=false;
      this.adminLoggedInUser=false;
     
      this.loggedInUser=false;
    }
  }



}
