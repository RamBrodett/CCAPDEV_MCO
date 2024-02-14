import './App.css'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './Pages/home.jsx'
import { Login } from './Pages/login.jsx'
import { Register } from './Pages/register.jsx'
import { Location } from './Pages/location.jsx'
import { Guide } from './Pages/guide.jsx'
import {Book} from './Pages/book.jsx'

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
            </Routes>
        </Router>
    )
}
export default App