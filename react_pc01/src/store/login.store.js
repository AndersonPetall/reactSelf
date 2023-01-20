//login module
import { makeAutoObservable } from "mobx"
import {http,setToken,getToken,removeToken} from '@/utils/index'
class  LoginStore{
    token = getToken() || ''
    constructor(){
        //响应式
        makeAutoObservable(this)
    }
    getToken=async ({mobile,code})=>{
        //调用登录接口
        const res = await http.post('http://geek.itheima.net/v1_0/authorizations',{
            mobile,code
        })
        //存入token
        // console.log(res)
        // console.log(res.data)
        // console.log(res.data.token)
        this.token = res.data.token
        //存入localstorage
        setToken(this.token)
    }
    logout=()=>{
        this.token=''
        removeToken()
    }
}
export default LoginStore