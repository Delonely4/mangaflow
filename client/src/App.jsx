import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import './App.css'


function App() {
    return (
        <div className="App">
            <nav>
                <Link to="/login">
                    Login
                </Link>
                <Link to="/register">
                    Register
                </Link>
            </nav>

            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={<Login />} />
            </Routes>
        </div>
    )
}


export default App
