import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            })

            const data = await response.json()

            if (response.ok) {
                setSuccess(true)
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            } else {
                setError(data.message || 'Registration error')
            }
        } catch (err) {
            console.error('Error:', err)
            setError('Unable to connect to the server')
        }
    }

    return (
        <div className="page-container">
            <div className="form-card">
                <h1 style={{ marginTop: 0, marginBottom: '30px', color: '#333' }}>Register</h1>

                {success && (
                    <div className="alert alert-success">
                        Registration successful! Redirecting to login...
                    </div>
                )}

                {error && (
                    <div className="alert alert-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Choose a username"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter your password"
                            required
                            />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Create Account
                    </button>
                </form>

                <p className="form-footer">
                    Already have an account? <a href="/login">Log in</a>
                </p>
            </div>
        </div>
    )
}

export default Register