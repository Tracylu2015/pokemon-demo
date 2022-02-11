import axios from 'axios'
import React, { useState, useContext } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import currentUser from '../context/CurrentUser'



const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const context = useContext(currentUser)

    const Login = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/user/login', { email, password })
            .then(res => {
                context.setCurrentUser(res.data)
                localStorage.setItem('user', JSON.stringify(res.data))
                navigate('/')
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
    console.log(context.currentUser)

    return (
        <Container>
            <form onSubmit={Login}>
                {errors.map((err, i) => <p key={i}>{err}</p>)}
                <div className="form-group">
                    <input onChange={e => setEmail(e.target.value)} type="text" name="email" placeholder="Email" value={email} className="form-control"/>
                </div>
                <div className="form-group">
                    <input onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Password" value={password} className="form-control"/>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
        </Container>
    )
}

export default LoginForm
