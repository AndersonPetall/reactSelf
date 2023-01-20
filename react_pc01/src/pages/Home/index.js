import './index.scss'
//思路 
/**
 * 1.0  看官方文档 把echarts加入到项目中  
 *   如何在react中获取dom -> useRef
 *   获取dom元素的时机  ->  useEffect
 * 2.0  不抽离定制化的参数  先把最小化的demo跑起来
 * 3.0  按照需求  抽象出需要自定义的参数
 * @returns 
 */
import Bar from './Bar'
const Home=()=>{
 
    return (
        <>
        {/* 渲染Bar组件 */}
        <Bar 
        title='主流框架使用满意度' 
        xData={['vue', 'angular', 'react']}
        yData={[50, 60, 70]}
        style={{ width: '500px', height: '400px' }}/>
        <Bar 
        title='主流语言使用满意度' 
        xData={['Python','C', 'Java', 'C++']}
        yData={[50,60,55,170]}
        style={{ width: '500px', height: '400px' }}/>
        </>
    )
}
export default Home      
