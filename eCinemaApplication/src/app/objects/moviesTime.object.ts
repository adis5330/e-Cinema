export class MoviesTime{


    private userTimesId: number=-1;
    private date: string="";
    private time: string="";
    private room: string="";



    public setUserTimesid(userTimesId:number) :void {
         this.userTimesId = userTimesId;
    }

    public setDate(date:string) :void {
         this.date = date;
    }

    public setTime(time:string) :void{
        this.time = time;
    }

    public setRoom(room:string) :void{
        this.room = room;
    }





    public getUserTimesid() :number {
        return this.userTimesId;
    }

    public getDate() :string {
        return this.date;
    }

    public getTime() :string{
        return this.time;
    }

    public getRoom() :string{
        return this.room;
    }



}