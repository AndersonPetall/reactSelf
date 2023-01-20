import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select,Table, Tag, Space } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useEffect,useState} from 'react'
import { http } from '@/utils'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    // //频道列表管理
    // const [channelList,setChannelList] = useState([])
    // const loadChannelList = async ()=>{
    //     const res = await http.get('/channels')
    //     setChannelList(res.data.channels)
    // }
    // useEffect(()=>{
    //     loadChannelList()
    // },[])
    //频道列表的封装
    const {channelStore} = useStore()
    //文章列表管理  统一管理数据 将来修改传给setList对象
    const [articleList,setArticleList] = useState({
        list:[],//文章列表
        count:0 //文章数量
    })
    //文章参数管理
    const [params,setParams] = useState({
        page:1,
        per_page:10
    })
    //如果异步请求函数需要依赖一些数据的变化而重新执行  
    //推荐把它写到内部
    //统一不抽离函数到外面 只要涉及到一步请求函数  都放到useEffect内部
    //本质区别: 写道外面每次组件更新都会重新进行函数的初始化  这本身就是一次性能的消耗
    //而写道useEffect中,只会在依赖项发生变化的时候 函数才会进行重新初始化,避免了性能损失
    useEffect(()=>{
        const loadArticleList = async()=>{
            const res = await http.get('/mp/articles',{params}) 
            const {results,total_count} = res.data
            setArticleList({
                list:results,
                count:total_count,
            })    
        }      
        loadArticleList()
    },[params])
    const onFinish=(values)=>{
        console.log(values)
        const {channel_id,date,status} = values
        const param = {}
        if(status !== null && status !== -1)param.status = status
        if(channel_id) param.channel_id = channel_id
        if(date){
            param.begin_date = date[0].format('YYYY-MM-DD')
            param.end_date = date[1].format('YYYY-MM-DD')
        }
        //修改params数据  引起接口重新发送   对象的合并操作
        setParams(param)
        console.log(params)
    }
    //更改每页显示文章数目
    const pagechange=(pageNumber)=>{
        setParams({
            ...params,pageNumber
        })
    }
    //删除文章
    const delArticle= async (e)=>{
        await http.delete(`/mp/articles/${e.id}`)
        // 更新列表
        setParams({
          page: 1,
          per_page: 10
        })
    }
    //跳转
    const navigate = useNavigate()
    const goPublish=(data)=>{
        navigate(`/Publish?id=${data.id}`)
    }
    // const data = [
    //     {
    //         id: '8218',
    //         comment_count: 0,
    //         cover: {
    //           images:['http://geek.itheima.net/resources/images/15.jpg'],
    //         },
    //         like_count: 0,
    //         pubdate: '2019-03-11 09:00:00',
    //         read_count: 2,
    //         status: 2,
    //         title: 'wkwebview离线化加载h5资源解决方案1' 
    //     },
    //     {
    //         id: '8219',
    //         comment_count: 0,
    //         cover: {
    //           images:['http://geek.itheima.net/resources/images/15.jpg'],
    //         },
    //         like_count: 0,
    //         pubdate: '2019-03-11 09:00:00',
    //         read_count: 2,
    //         status: 2,
    //         title: 'wkwebview离线化加载h5资源解决方案2' 
    //     },
    //     {
    //         id: '8220',
    //         comment_count: 0,
    //         cover: {
    //           images:['http://geek.itheima.net/resources/images/15.jpg'],
    //         },
    //         like_count: 0,
    //         pubdate: '2019-03-11 09:00:00',
    //         read_count: 2,
    //         status: 2,
    //         title: 'wkwebview离线化加载h5资源解决方案3' 
    //     },
    //     {
    //         id: '8221',
    //         comment_count: 0,
    //         cover: {
    //           images:['http://geek.itheima.net/resources/images/15.jpg'],
    //         },
    //         like_count: 0,
    //         pubdate: '2019-03-11 09:00:00',
    //         read_count: 2,
    //         status: 2,
    //         title: 'wkwebview离线化加载h5资源解决方案4' 
    //     },
    //     {
    //         id: '8222',
    //         comment_count: 0,
    //         cover: {
    //           images:['http://geek.itheima.net/resources/images/15.jpg'],
    //         },
    //         like_count: 0,
    //         pubdate: '2019-03-11 09:00:00',
    //         read_count: 2,
    //         status: 2,
    //         title: 'wkwebview离线化加载h5资源解决方案5' 
    //     },
    //     ,{
    //         id: '8223',
    //         comment_count: 0,
    //         cover: {
    //           images:['http://geek.itheima.net/resources/images/15.jpg'],
    //         },
    //         like_count: 0,
    //         pubdate: '2019-03-11 09:00:00',
    //         read_count: 2,
    //         status: 2,
    //         title: 'wkwebview离线化加载h5资源解决方案6' 
    //     },
    //     {
    //         id: '8224',
    //         comment_count: 0,
    //         cover: {
    //           images:['http://geek.itheima.net/resources/images/15.jpg'],
    //         },
    //         like_count: 0,
    //         pubdate: '2019-03-11 09:00:00',
    //         read_count: 2,
    //         status: 2,
    //         title: 'wkwebview离线化加载h5资源解决方案7' 
    //     },
    //     {
    //         id: '8225',
    //         comment_count: 0,
    //         cover: {
    //           images:['http://geek.itheima.net/resources/images/15.jpg'],
    //         },
    //         like_count: 0,
    //         pubdate: '2019-03-11 09:00:00',
    //         read_count: 2,
    //         status: 2,
    //         title: 'wkwebview离线化加载h5资源解决方案8' 
    //     },
    //     {
    //         id: '8226',
    //         comment_count: 0,
    //         cover: {
    //           images:['http://geek.itheima.net/resources/images/15.jpg'],
    //         },
    //         like_count: 0,
    //         pubdate: '2019-03-11 09:00:00',
    //         read_count: 2,
    //         status: 2,
    //         title: 'wkwebview离线化加载h5资源解决方案9' 
    //     },
    //     {
    //         id: '8227',
    //         comment_count: 0,
    //         cover: {
    //           images:['http://geek.itheima.net/resources/images/15.jpg'],
    //         },
    //         like_count: 0,
    //         pubdate: '2019-03-11 09:00:00',
    //         read_count: 2,
    //         status: 2,
    //         title: 'wkwebview离线化加载h5资源解决方案10' 
    //     },
    //     {
    //         id: '8228',
    //         comment_count: 0,
    //         cover: {
    //           images:['http://geek.itheima.net/resources/images/15.jpg'],
    //         },
    //         like_count: 0,
    //         pubdate: '2019-03-11 09:00:00',
    //         read_count: 2,
    //         status: 2,
    //         title: 'wkwebview离线化加载h5资源解决方案11' 
    //     },
    //     {
    //         id: '8229',
    //         comment_count: 0,
    //         cover: {
    //           images:['http://geek.itheima.net/resources/images/15.jpg'],
    //         },
    //         like_count: 0,
    //         pubdate: '2019-03-11 09:00:00',
    //         read_count: 2,
    //         status: 2,
    //         title: 'wkwebview离线化加载h5资源解决方案12' 
    //     },
    //     {
    //         id: '8230',
    //         comment_count: 0,
    //         cover: {
    //           images:['http://geek.itheima.net/resources/images/15.jpg'],
    //         },
    //         like_count: 0,
    //         pubdate: '2019-03-11 09:00:00',
    //         read_count: 2,
    //         status: 2,
    //         title: 'wkwebview离线化加载h5资源解决方案13' 
    //     },
    //     {
    //         id: '8231',
    //         comment_count: 0,
    //         cover: {
    //           images:['http://geek.itheima.net/resources/images/15.jpg'],
    //         },
    //         like_count: 0,
    //         pubdate: '2019-03-11 09:00:00',
    //         read_count: 2,
    //         status: 2,
    //         title: 'wkwebview离线化加载h5资源解决方案14' 
    //     },
    //     {
    //         id: '8232',
    //         comment_count: 0,
    //         cover: {
    //           images:['http://geek.itheima.net/resources/images/15.jpg'],
    //         },
    //         like_count: 0,
    //         pubdate: '2019-03-11 09:00:00',
    //         read_count: 2,
    //         status: 2,
    //         title: 'wkwebview离线化加载h5资源解决方案15' 
    //     },
    //     {
    //         id: '8233',
    //         comment_count: 0,
    //         cover: {
    //           images:['http://geek.itheima.net/resources/images/15.jpg'],
    //         },
    //         like_count: 0,
    //         pubdate: '2019-03-11 09:00:00',
    //         read_count: 2,
    //         status: 2,
    //         title: 'wkwebview离线化加载h5资源解决方案16' 
    //     }
    // ]

    const columns = [
        {
          title: '封面',
          dataIndex: 'cover',
          width:120,
          render: cover => {
            return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
          }
        },
        {
          title: '标题',
          dataIndex: 'title',
          width: 220
        },
        {
          title: '状态',
          dataIndex: 'status',
          render: data => <Tag color="green">审核通过</Tag>
        },
        {
          title: '发布时间',
          dataIndex: 'pubdate'
        },
        {
          title: '阅读数',
          dataIndex: 'read_count'
        },
        {
          title: '评论数',
          dataIndex: 'comment_count'
        },
        {
          title: '点赞数',
          dataIndex: 'like_count'
        },
        {
          title: '操作',
          render: data => {
            return (
              <Space size="middle">
                <Button type="primary" shape="circle" icon={<EditOutlined />} 
                    onClick={()=>goPublish(data)}/>
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined/>}
                  onClick={()=>delArticle(data)}
                />
              </Space>
            )
          }
        }
      ]
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: null }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 160 }}
            >
                {channelStore.channelList.map(item=>(
                    <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            {/* <RangePicker locale={locale}></RangePicker> */}
            <RangePicker></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 文章列表区域 */}
      <Card title={`根据筛选条件共查询到 ${articleList.count} 条结果：`}>
        <Table 
        rowKey={record => record.id} columns={columns} 
        dataSource={articleList.list} 
        pagination={
            {
            pageSize:params.per_page,
            total:articleList.count,
            // pageSize:5,
            // total:16,
            // onChange : pageChange,
            showSizeChanger:true
        }
        }/>
      </Card>
    </div>
  )
}

export default observer(Article)