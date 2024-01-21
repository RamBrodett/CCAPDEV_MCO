import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import {Home} from './Pages/Home.jsx'

function App() {
    <Router>
        <Routes>
            <Route path='/' Component={<Home/>}/>
        </Routes>
    </Router>
}

export default App
