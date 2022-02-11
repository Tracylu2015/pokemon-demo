import axios from 'axios'
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import currentUser from '../context/CurrentUser'
import { Container } from 'react-bootstrap'

const RegistrationForm = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const context = useContext(currentUser)

    const Register = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/user/register', { firstName, lastName, email, password, confirmPassword })
            .then(res => {
                context.setCurrentUser(res.data)
                setErrors([])
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

    return (
        <Container>
            <form onSubmit={Register}>
                {errors.map((err, i) => <p key={i}>{err}</p>)}
                <div className="form-group">
                    <input onChange={e => setFirstName(e.target.value)} type="text" name="firstName" placeholder="First Name" className="form-control" />
                </div>
                <div className="form-group">
                    <input onChange={e => setLastName(e.target.value)} type="text" name="lastName" placeholder="Last Name" className="form-control" />
                </div>
                <div className="form-group">
                    <input onChange={e => setEmail(e.target.value)} type="text" name="email" placeholder="Email" className="form-control" />
                </div>
                <div className="form-group">
                    <input onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Password" className="form-control" />
                </div>
                <div className="form-group">
                    <input onChange={e => setConfirmPassword(e.target.value)} type="password" name="confirm_password" placeholder="Confirm Password" className="form-control" />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Register</button>
                </div>
            </form>
        </Container>
    )
}

export default RegistrationForm
