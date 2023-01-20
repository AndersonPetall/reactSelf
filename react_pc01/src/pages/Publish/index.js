import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
  } from 'antd'
  import { PlusOutlined } from '@ant-design/icons'
  import { Link, useSearchParams } from 'react-router-dom'
  import './index.scss'
  import ReactQuill from 'react-quill';
  import 'react-quill/dist/quill.snow.css';
  import { useStore } from '@/store';
  import { observer } from 'mobx-react-lite';
  import { useState,useRef, useEffect } from 'react';
  import { http } from '@/utils';

  import { useNavigate } from 'react-router-dom'
  const { Option } = Select
  const Publish = () => {
    const navigate = useNavigate()
    //文章发布/文章编辑
    const [params] = useSearchParams()
    const articleId = params.get('id')
    //console.log('route:',articleId)
    const formDom = useRef(null)
    
    //使用useRef 声明一个暂存仓库
    const cacheImgList = useRef([])

    //数据回填   id调用接口  将数据填到对应位置  1表单回填 2暂存列表回填 3upload组件fileList
    useEffect (()=>{
        async function getArticle(){
            const res = await http.get(`/mp/articles/${articleId}`)
            const data = res.data
            //表单数据回填  实例方法
            formDom.current.setFieldsValue({...data,type:data.cover.type})
            //调用setFileList 方法回填upload
            //const formatImgList = data.cover.images.map(item=>{return{url:item}})
            //简洁写法
            const formatImgList = data.cover.images.map(url=>({url}))
            setFileList(formatImgList)
            //暂存列表中也有   和fileList列表中数据结构保持统一
            cacheImgList.current = formatImgList
        }
        //必须是编辑状态  才可以发送请求
        if(articleId) getArticle()
        console.log(formDom.current)
    }, [articleId])

    const {channelStore} = useStore()
    //存放上传图片的列表
    const [fileList,setFileList] = useState([])
    // //上传图片
    // const onUploadChange = (res)=>{
    //     console.log(res)
    //     //setFileList(fileList)
    // }
    
    const onUploadChange = info => {
        const fileList = info.fileList.map(file => {
          if (file.response) {
            //console.log(file)
            return {
              url: file.response.data.url
            }
          }
          return file
        })
        setFileList(fileList)
        //把图片列表存入仓库中
        cacheImgList.current = fileList
    }

    //上传图片数量
    const [imgCount, setImgCount] = useState(1)
    const changeImgUploadType = e =>{
        //console.log(e)
        const count = e.target.value
        setImgCount(count)
        //从仓库中取出对应图片, 交给我们用来渲染列表图片的fileList  通过调用setFileList

        if(count === 1 ){
            const img = cacheImgList.current[0]
            setFileList(!img?[]:[img])
        }
        else if(count === 3) {
            const img = cacheImgList.current
            setFileList(img)
        }
    }
    //表单提交
    const onFinish = async (values)=>{
        console.log(`onFinish work:${values}`)
        //数据的二次处理
        //重点是cover字段
        const {channel_id,content,title,type} = values
        const params = {
            channel_id,content,title,type,cover:{
                type:type,
                images:fileList.map(item=>item.url)
            }
        }
        if(articleId){
            //console.log(params)
            await http.put(`/mp/articles/${articleId}?draft=false`, params)
        }
        else{
            await http.post('/mp/articles?draft=false', params)
        }
        //跳转列表  提示用户
        navigate('/Article')
        message.success(`${articleId?'更新成功':'发布成功'}`)
    }

    return (
      <div className="publish">
        <Card
          title={
            <Breadcrumb separator=">">
              <Breadcrumb.Item>
                <Link to="/home">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{articleId ? '编辑文章':"发布文章"}</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ type: 1,content:'' }}
            onFinish = {onFinish}
            ref={formDom}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: '请输入文章标题' }]}
            >
              <Input placeholder="请输入文章标题" style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="频道"
              name="channel_id"
              rules={[{ required: true, message: '请选择文章频道' }]}
            >
              <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                {channelStore.channelList.map(item=>(
                    <Option value={item.id} key={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
  
            <Form.Item label="封面">
              <Form.Item name="type">
                <Radio.Group onChange ={changeImgUploadType}>
                  <Radio value={1}>单图</Radio>
                  <Radio value={3}>三图</Radio>
                  <Radio value={0}>无图</Radio>
                </Radio.Group>
              </Form.Item>
              {imgCount > 0 && (
                <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={true}
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                // onDrop={onUploadChange}
                maxCount = {imgCount}
                multiple = {imgCount>1}
              >
                <div style={{ marginTop: 8 }}>
                    <div style={{ marginTop: 8 }}>
                        <PlusOutlined />
                    </div>
                </div>
              </Upload>
              )}
            </Form.Item>
            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: '请输入文章内容' }]}
            >
                <ReactQuill theme="snow" placeholder='请输入文章内容' />
            </Form.Item>
  
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button size="large" type="primary" htmlType="submit">
                {articleId ? '更新文章':"发布文章"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  
  export default observer(Publish)