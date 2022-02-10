import axios from 'axios'
import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
    const search = ()=>{
        axios.get(`...`)
        .then(res=>{
            console.log(res.data)
        })
        .catch(err=>console.log(err))
    }
    return (
        <div>
            <h1>Welcome</h1>
            <form onSubmit={search} >
            <input type="text" name="search" placeholder="Search"></input>
            <button>Search</button>
            </form>
            <button> <Link to="/user/login"> Login/Register</Link> </button>&nbsp;
        </div>
    )
}

export default Navbar