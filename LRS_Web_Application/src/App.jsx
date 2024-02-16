import './App.css'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './Pages/Home.jsx'
import { Login } from './Pages/login.jsx'
import { Register } from './Pages/register.jsx'
import { Location } from './Pages/location.jsx'
import { Guide } from './Pages/guide.jsx'
import { LabSelect } from './Pages/labSelect.jsx'
import { Book } from './Pages/book.jsx'
import {Profile} from './Pages/profile.jsx'
import { UserProvider } from './UserProvider.jsx'

function App() {
    return(
        <UserProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/locations' element={<Location/>}/>
                    <Route path='/guide' element={<Guide/>}/>
                    <Route path='/labSelect' element={<LabSelect />}/>
                    <Route path="/book/:selectedLab/:selectRow/:selectCol" component={Book} />
                    <Route path='/book' element={<Book />}/>
                    <Route path='/profile/:userId' element={<Profile />}/>
                </Routes>
            </Router>
        </UserProvider>
    )
}
export default App