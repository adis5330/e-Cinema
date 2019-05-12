export class MovieScheduler{



    private Id: number=-1;
    private movieTitle: string ="";
    private room: string ="";
    private date: string="";
    private time :string="";


    public constructor(id:number,movieTitle:string,room:string,date:string,time:string){
        console.log(id)
        
        this.Id = id; this.movieTitle=movieTitle; this.room=room; this.date=date; this.time= time;
    }


    public setScheduleId(ScheduleId:number) :void {
        this.Id = ScheduleId;
    }

    public setMovieTitle(mMovieTitle:string) :void{
        this.movieTitle = mMovieTitle;
    }

    public setMovieRoom(room:string) :void{
        this.room = room;
    }
    public setMovieTime(time:string) :void{
        this.time = time;
    }


    public setDate(dateTo:string) :void{
        this.date = dateTo;
    }

   





    public getScheduleId() :number {
        return this.Id;
    }

    public getMovieTitle() :string{
        return this.movieTitle;
    }

    public getMovieRoom() :string{
        return this.room;
    }
    public getMovieTime() :string{
        return this.time;
    }


    public getDate() :string{
        return this.date;
    }

  





}