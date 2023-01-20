import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
const { Header, Sider } = Layout

const GeekLayout = () => {
  //浏览器路径地址
  const location = useLocation()
  const {userStore,loginStore,channelStore}  = useStore()
  //只在开始的时候调用一次
  useEffect(()=>{
    userStore.getUserInfo()
    channelStore.loadChannelList()
  },[userStore,channelStore])
//   console.log(location)
//确定退出
  const navigate = useNavigate()
  const onConfirm=()=>{
    //退出登录  删除token  跳回登录
    loginStore.logout()
    navigate('/login')
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
            {/* 高亮原理: defaultSelectedKeys = {['item.key']} */}
            {/* 获取当前path路径 ?  */}
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[location.pathname]}
            // defaultSelectedKeys={[location.pathname]}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
                <Link to='/'>数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/Article">
                <Link to='/Article'>内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/Publish">
                <Link to='/Publish'>发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
            {/* 二级路由出口 */}
            <Outlet/>
        </Layout>

      </Layout>
    </Layout>
  )
}

export default observer(GeekLayout)