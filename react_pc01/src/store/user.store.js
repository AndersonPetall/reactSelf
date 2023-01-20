import { makeAutoObservable, runInAction } from "mobx";
import { http } from "@/utils";

class UserStore{
    userInfo={}
    constructor(){
        makeAutoObservable(this)
    }
    getUserInfo = async()=>{
        //调用接口
        const res = await http.get('/user/profile')
        runInAction(() => {
            this.userInfo = res.data
        });
        // this.userInfo = res.data
    }
}
export default UserStore