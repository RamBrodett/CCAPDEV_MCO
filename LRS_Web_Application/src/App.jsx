import './App.css'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './Pages/Home.jsx'
import { Login } from './Pages/login.jsx'
import { Register } from './Pages/register.jsx'
import { Location } from './Pages/location.jsx'
import { Guide } from './Pages/guide.jsx'
import {Book} from './Pages/book.jsx'
import {Profile} from './Pages/profile.jsx'

function App() {
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/locations' element={<Location/>}/>
                <Route path='/guide' element={<Guide/>}/>
                <Route path='/book' element={<Book />}/>
                <Route path='/profile' element={<Profile />}/>
            </Routes>
        </Router>
    )
}
export default App