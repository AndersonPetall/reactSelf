import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from '@/pages/Login/index'
import Layout from '@/pages/Layout/index'
import { AuthComponent } from './components/AuthComponent';
import Home from '@/pages/Home'
import Article from '@/pages/Article'
import Publish from '@/pages/Publish'
import { HistoryRouter, history } from './utils/history'
function App() {
  return (
    
    <HistoryRouter history={history}>
      <div>
    {/* <BrowserRouter> */}
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          {/* 路由鉴权 */}
          <Route path='/*' element={<AuthComponent><Layout/></AuthComponent>}>
            <Route index element={<Home/>}></Route>
            <Route path='Article' element={<Article/>}></Route>
            <Route path='Publish' element={<Publish/>}></Route>
          </Route>
        </Routes>
    {/* </BrowserRouter> */}

    </div>
    </HistoryRouter>
    
  );
}

export default App;
