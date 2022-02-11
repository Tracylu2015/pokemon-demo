import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import currentUser from '../context/CurrentUser'

const Navbar = () => {

    const context = useContext(currentUser)
    const navigate = useNavigate()
    const [text, setText] = useState("")

    const search = (e) => {
        e.preventDefault()
        navigate(`/pokemon/search/${text}`)
        setText("")
    }

    return (
        <div>
            {context.currentUser != null ?
                <div>
                    <h1>Welcome {context.currentUser.username}</h1>
                    <form onSubmit={search} >
                        <input type="text" name="search" placeholder="Search" value={text} onChange={(e) => setText(e.target.value)}></input>
                        <button>Search</button>
                    </form>
                    <button>Logout</button>
                </div>
                : <button> <Link to="/user/login"> Login/Register</Link> </button>}
        </div>
    )
}

export default Navbar