export class UpcomingMovie{


    private Id: number=-1;
    private title: String ="";
    private director:String ="";
    private actors:String="";
    private moviePicture:String="";
    private summary:String="";
    private type:String="";
    private creationDate:String="";
    private country:String="";
    private showDay:String=""


    public Movies(){

    }


    public setMovieId(movieId:number) :void{
        this.Id = movieId;
    }

    public setMovieTitle(title:String) :void{
        this.title = title;
    }
    public setMovieDirector(director:String) :void{
        this.director = director;
    }
    public setMovieActors(actors:String) :void{
        this.actors = actors;
    }
    public setMoviePicture(moviePicture:String) :void{
        this.moviePicture = moviePicture;
    }
    public setMovieSummary(summary:String) :void{
        this.summary = summary;
    }
    public setMovieType(type:String) :void{
        this.type = type;
    }

    public setMovieCountry(country:String) :void{
        this.country = country;
    }

    public setMovieCreationDate(creationDate:String) :void{
        this.creationDate = creationDate;
    }

   public setShowDay(showDay:String){
       this.showDay = showDay;
   }


   
    public getMovieId() :number{
       return  this.Id;
    }

    public getMovieTitle() :String{
      return   this.title;
    }
    public getMovieDirector() :String{
       return  this.director;
    }
    public getMovieActors() :String{
        return this.actors;
    }
    public getMoviePicture() :String{
        return this.moviePicture ;
    }
    public getMovieSummary() :String{
        return this.summary ;
    }
    public getMovieType() :String{
        return this.type;
    }

    public getMovieCountry() :String{
        return this.country;
    }

    public getMovieCreationDate() :String{
        return this.creationDate;
    }

    public getShowDay():String{
        return this.showDay;
    }


}