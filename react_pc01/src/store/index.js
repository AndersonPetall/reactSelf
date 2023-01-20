//把所有的模块进行统一的处理
//导出一个统一的方法  useStore
import React from 'react'
import LoginStore from './login.store'
import UserStore from './user.store'
import ChannelStore from './channel.store'
class RootStore{
    constructor(){
        this.loginStore = new LoginStore()
        this.userStore = new UserStore()
        this.channelStore = new ChannelStore()
    }
}
const StoresContext = React.createContext(new RootStore())
export const useStore = ()=>React.useContext(StoresContext)

// const rootStore = new RootStore()
// const context = React.createContext(rootStore)
// const useStore = ()=>React.useContext(context)
// export {useStore}