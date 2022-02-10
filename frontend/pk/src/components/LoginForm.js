import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'



const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const history = useHistory()


    const Login = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/user/login', { email, password })
            .then(res => {
                history.push('/')

            })
            .catch(err => {
                const errorResponse = err.response.data.errors
                const errArr = []
                for (const key of Object.keys(errorResponse)) {
                    errArr.push(errorResponse[key].message)
                }
                setErrors(errArr)
            })
    }

    return (
        <div>
            <form onSubmit={Login}>
                {errors.map((err, i) => <p key={i}>{err}</p>)}
                <input onChange={e => setEmail(e.target.value)} type="text" name="email" placeholder="Email" value={email} />
                <input onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Password" value={password} />
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginForm
