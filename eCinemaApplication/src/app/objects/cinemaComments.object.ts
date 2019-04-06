export class CinemaComments {



    private Id :number=-1;
    private comment :string="";
    private user :string="";


    

    public setCinemaCommentId(cinemaCommentId:number) :void{
        this.Id = cinemaCommentId;
    }

    public setCinemaComment(cinemaComment:string) :void{
        this.comment = cinemaComment;
    }

    public setUserComment(userComment:string) :void{
        this.user = userComment;
    }





    public getCinemaCommentId() :number{
        return this.Id;
    }

    public getCinemaComment() :string{
        return this.comment;
    }

    public getUserComment() :string{
        return this.user;
    }





}