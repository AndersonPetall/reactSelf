//1.0  先判断token是否存在
//2.0  如果token 存在, 正常渲染
//3.0  如果token 不存在, 重定向等有登录


//高阶组件:
//把一个组件当成另一个组件的参数传入, 然后通过一定的判断,返回一个新的组件

/**
 * 高阶组件
那么什么是高阶组件呢?
高阶组件的英文是Higher-Order Components，简称为 HOC
官方定义是: 高阶组件是参数为组件,返回值为新组件的函数
高阶组件本身不是一个组件,而是一个函数
这个函数的参数是一个组件,返回值也是一个组件
 */

import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";
function AuthComponent({children}){
    const isToken = getToken()
    if(isToken){
        return <>{children}</>
    }
    else{
        return <Navigate to='/login' replace />
    }
}

//<AuthComponent><Layout/></AuthComponent>
//登录状态: <><Layout/></>
//非登录状态: <Navigate to='/login' replace />
export {
    AuthComponent
}