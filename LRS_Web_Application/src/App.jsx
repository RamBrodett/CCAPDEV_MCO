import './App.css'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './Pages/home.jsx'
import { Login } from './Pages/login.jsx'
import { Register } from './Pages/register.jsx'
import { Location } from './Pages/location.jsx'

function App() {
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/locations' element={<Location/>}/>
            </Routes>
        </Router>
    )
}
export default App