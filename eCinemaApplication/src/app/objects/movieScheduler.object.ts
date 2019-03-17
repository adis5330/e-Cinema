export class MovieScheduler{



    private Id: number=-1;
    private movieTimesId: number=-1;
    private movieId: number=-1;
    private dateTo: string="";
    private dateFrom: string="";



    public setScheduleId(ScheduleId:number) :void {
        this.Id = ScheduleId;
    }

    public setMovieTimesId(movieTimesId:number) :void{
        this.movieTimesId = movieTimesId;
    }

    public setMovieId(movieId:number) :void{
        this.movieId = movieId;
    }

    public setDateTo(dateTo:string) :void{
        this.dateTo = dateTo;
    }

    public setDateFrom(dateFrom:string) :void{
        this.dateFrom = dateFrom;
    }






    public getScheduleId() :number {
        return this.Id;
    }

    public getMovieTimesId() :number{
        return this.movieTimesId;
    }

    public getMovieId() :number{
        return this.movieId;
    }

    public getDateTo() :string{
        return this.dateTo;
    }

    public getDateFrom() :string{
        return this.dateFrom;
    }






}