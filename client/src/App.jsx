import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import './App.css'


function App() {
    return (
        <div className="App">
            <nav style={{ padding: '20px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
                <Link to="/login" style={{marginRight: '20px', textDecoration: 'none', color: '#007bff'}}>
                    Log in
                </Link>
                <Link to="/register" style={{textDecoration: 'none', color: '#007bff'}}>
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
