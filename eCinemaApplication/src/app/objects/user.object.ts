export class User{

    private userId: number=-1;
    private name: String ="";
    private lastName:String ="";
    private email:String="";
    private telephone:String="";
    private password:String="";
    private birth:String="";
    private userType:String="";

 


    public setUserId(userId:number) :void{
        this.userId = userId;
    }

    public setUserName(userName:String) :void{
        this.name = name;
    }
    public setUserLastName(userLastName:String) :void{
        this.lastName = userLastName;
    }
    public setEmail(userEmail:String) :void{
        this.email = userEmail;
    }
    public setUserTelephone(userTelephone:String) :void{
        this.telephone = userTelephone;
    }
    public setUserPassword(userPassword:String) :void{
        this.password = userPassword;
    }
    public setUserBirth(userBirth:String) :void{
        this.birth = userBirth;
    }
    public setUserType(userType:String) :void{
        this.userType = userType;
    }


    public getUserId() :number{
        return this.userId;
    }

    public getUserName() :String{
        return this.name;
    }
    public getUserLastName() :String{
        return this.lastName;
    }
    public getEmail() :String{
       return  this.email;
    }
    public getUserTelephone() :String{
       return  this.telephone;
    }
    public getUserPassword() :String{
        return this.password;
    }
    public getUserBirth() :String{
       return  this.birth;
    }
    public getUserType() :String{
       return  this.userType;
    }



}