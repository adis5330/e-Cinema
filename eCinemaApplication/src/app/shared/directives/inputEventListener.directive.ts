import { Directive, OnInit, HostListener, HostBinding, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Directive({
  selector: '[inputEventListener]'
})
export class inputEventListener implements OnInit{
  
  constructor(private elementRef : ElementRef,private renderer : Renderer2,private movieService: MoviesService) { }
 
  @ViewChild("searchInput") searchInputElement:ElementRef;


  ngOnInit(): void {
    
  }


  @HostListener("document:keyup", ['$event'])
  onKeydown(event) {
    if (event.key === "Enter") {
      this.movieService.searchButtonClicked.next(true);


       this.movieService.searchForMovies(this.elementRef.nativeElement.value).then((data:any)=>{



        
         data.subscribe((data:{actors:string,country:string,creationDate:string,director:string,id:string,moviePictures:string
          summary:string,title:string,type:string}[])=>{
          for(var i=0; i<data.length; i++){
            this.movieService.searchContent.next(
              {
                "actors":data[i].actors,
                "country":data[i].country,
                "creationDate":data[i].creationDate,
                "director":data[i].director,
                "id":data[i].id,
                "moviePictures":data[i].moviePictures,
                "summary":data[i].summary,
                "title":data[i].title,
                "type":data[i].type
                }
            );

            

          }

         })
       });
     }
    }

  
}
