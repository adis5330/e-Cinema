export class MoviesTime{


    private id: number=-1;
    private date: string="";
    private time: string="";
    private room: string="";



    public setUserTimesid(id:number) :void {
         this.id = id;
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





    public getId() :number {
        return this.id;
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