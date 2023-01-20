import { Card ,Form,Input,Checkbox,Button,message } from "antd"
import logo from '@/assets/logo.png'
import './index.scss'
import {useStore} from '@/store/index'
import { useNavigate } from "react-router-dom"
function Login (){
    const {loginStore} = useStore()
    const navigate = useNavigate()
    // const [messageApi,contextHolder] = message.useMessage()
    async function onFinish(e){
        // console.log(e)
        // console.log(e.code)
        // console.log(e.number)
        try{
            await loginStore.getToken({mobile:e.number,code:e.code})
            //提示登录成功
            message.success('login successful !')
            //跳转
            navigate('/',{replace:true})
        }catch(e){
            message.error(e.response?.data?.message||'login fail !!!')
        }
    }
    function onFail(e){
        console.log(e)
        console.log(e.values.code)
        console.log(e.values.number)
    }
    return (
        <>
        <div className='login'>
            <Card className='login-container'>
                <img className='login-logo' src={logo} alt=''/>
                    <Form 
                    initialValues={{remember: true,number:13811111111,code:246810}} 
                    validateTrigger={['onBlur','onChange']} 
                    onFinish={onFinish}
                    onFinishFailed ={onFail}>
                        <Form.Item name='number' 
                        rules={[{required:true,message:'Please input your number'},{pattern: /^1[3-9]\d{9}$/,message: '手机号码格式不对',validateTrigger:'onBlur'}]}>
                            <Input size='large' placeholder="please input the number"/>
                        </Form.Item>
                        <Form.Item name='code' 
                        rules={[{required:true,message:'Please input your code'},{len:6,message:'请输入6位秘密',validateTrigger:'onBlur'}]}>
                            <Input size='large' placeholder="please input the code"/>
                        </Form.Item>
                        <Form.Item  name="remember" valuePropName="checked">
                            <Checkbox className='login-checkbox-label'>我已阅读并且同意[用户协议]和[隐私条款]</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' size='large' block >登录</Button>
                        </Form.Item>
                    </Form>
            </Card>
        </div>   
        </>
    )
}
export default Login