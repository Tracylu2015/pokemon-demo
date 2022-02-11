import axios from 'axios'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import currentUser from '../context/CurrentUser'

const Navbar = () => {

    const context = useContext(currentUser)

    const search = () => {
        axios.get(`...`)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            {context.currentUser != null ?
                <div>
                    <h1>Welcome {context.currentUser.username}</h1>
                    <form onSubmit={search} >
                        <input type="text" name="search" placeholder="Search"></input>
                        <button>Search</button>
                    </form>
                    <button>Logout</button>
                </div>
                : <button> <Link to="/user/login"> Login/Register</Link> </button>}
        </div>
    )
}

export default Navbar