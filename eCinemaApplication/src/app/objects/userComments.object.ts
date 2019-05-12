export class UserComments{

    private userName:string;
    private message:string;

    constructor(userName:string,message:string){
        this.userName = userName;
        this.message=message;
    }

    public setUserName(userName:string):void{
        this.userName= userName
    }
    public setMessage(message:string):void{
        this.message= message;
    }

    public getUserName():string{
        return this.userName;
    }
    public getMessage():string{
        return this.message;
    }

}