import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!email.trim()) {
            setError('Please enter your email')
            return
        }
        if (!password.trim()) {
            setError('Please enter your password')
            return
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            const data = await response.json()

            if (response.ok) {
                if (data.token) {
                    localStorage.setItem('token', data.token)
                }

                setSuccess(true)

                setTimeout(() => {
                    navigate('/')
                }, 1500)
            } else {
                setError(data.message || 'Wrong email or password')
            }
        } catch (err) {
            console.error('Error:', err)
            setError('Unable to connect to the server')
        }
    }

    return (
        <div className="page-container">
            <div className="form-card">

            <h1 style={{ marginTop: 0, marginBottom: '30px', color: '#333' }}>Login</h1>

            {success && (
                <div className="alert alert-success">
                    Logged in successfully!
                </div>
            )}

            {error && (
                <div className="alert alert-error">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Email:
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', fontSize: '16px' }}
                    />
                </div>

                <div className="form-group">
                    <label>
                        Password:
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', fontSize: '16px' }}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary">
                    Log in
                </button>
            </form>

            <p className="form-footer">
                Have no account? <a href="/register">Register</a>
            </p>
            </div>
        </div>
    )
}

export default Login