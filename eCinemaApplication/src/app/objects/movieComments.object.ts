export class MovieComments {


    private Id :number=-1;
    private comment :string="";
    private userName :string="";
    private rate :number=-1;
    private movieId : number =-1;




    public setCommentId(CommentId:number) :void{
        this.Id = CommentId;
    }
    public setMovieId(id :number) :void{
        this.movieId = id;
    }

    public setComment(comment:string) :void{
        this.comment = comment;
    }

    public setUserName(userName:string) :void{
        this.userName = userName;
    }

    public setRate(rate:number) :void{
        this.rate = rate;
    }






    public getCommentId() :number{
        return this.Id;
    }

    public getComment() :string{
        return this.comment;
    }

    public getUserName() :string{
        return this.userName;
    }

    public getRate() :number{
        return this.rate;
    }

    public getMovieId():number{
        return this.movieId;
    }

}