import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const RegistrationForm = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])
    const history = useHistory()

    const Register = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/user/register', { firstName, lastName, email, password, confirmPassword })
            .then(res => {
                setErrors([])
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
            <form onSubmit={Register}>
                {errors.map((err, i) => <p key={i}>{err}</p>)}
                <input onChange={e => setFirstName(e.target.value)} type="text" name="firstName" placeholder="First Name" />
                <input onChange={e => setLastName(e.target.value)} type="text" name="lastName" placeholder="Last Name" />
                <input onChange={e => setEmail(e.target.value)} type="text" name="email" placeholder="Email" />
                <input onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Password" />
                <input onChange={e => setConfirmPassword(e.target.value)} type="password" name="confirm_password" placeholder="Confirm Password" />
                <button>Register</button>
            </form>
        </div>
    )
}

export default RegistrationForm
