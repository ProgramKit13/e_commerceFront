import {Routes, Route, Outlet} from 'react-router-dom'
import {Login} from './pages/Login';
import {Register} from './pages/Register';
import {NotFound} from './pages/NotFound';
import { RequireAuth } from './assets/components/RequireAuth';
import MenuAdminPage from './assets/components/MenuAdminPage';



function App() {
  return (
    <div className="App">
         <div className='system_import'>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path= '*' element={<NotFound />} />               
                <Route path='/axiosadmin/*' element={<RequireAuth><MenuAdminPage/></RequireAuth>}/>

            </Routes>
         </div>
    </div>
  )
}

export default App



