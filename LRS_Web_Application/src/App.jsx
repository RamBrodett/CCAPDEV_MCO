import './App.css'
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './Pages/home.jsx'

function App() {
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </Router>
    )
}
export default App