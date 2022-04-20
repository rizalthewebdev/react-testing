import axios from 'axios'
import React, { useState } from 'react'
import "./Login.css"

const Login = () => {
    const [error, setError] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)


    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.get('https://jsonplaceholder.typicode.com/users/1')
            setUser(data)
            setLoading(false)
        } catch {
            setError(true)
            setLoading(false)
        }

    }

    return (
        <main>
            <div className='container'>
                <span className='user'>{user.name}</span>
                <form>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type='submit'
                        disabled={!username || !password}
                        onClick={handleLogin}
                    >
                        {loading ? 'Please Wait' : 'Login'}
                    </button>
                </form>
                <span data-testid="error-msg" style={{ visibility: error ? "visible" : "hidden" }}>Something went wrong!</span>
            </div>
        </main>
    )
}

export default Login