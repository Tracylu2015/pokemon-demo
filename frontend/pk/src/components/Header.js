import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import currentUser from '../context/CurrentUser'
import { Navbar, Container} from 'react-bootstrap'

const Header = () => {

    const context = useContext(currentUser)
    const navigate = useNavigate()
    const [text, setText] = useState("")

    const search = (e) => {
        e.preventDefault()
        navigate(`/pokemon/search/${text}`)
        setText("")
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                {context.currentUser != null ?
                    <div>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Navbar.Brand className="navbar-brand">Welcome {context.currentUser.username}</Navbar.Brand>
                            <Navbar.Collapse className="justify-content-end">
                                <form onSubmit={search} >
                                    <input type="text" name="search" placeholder="Search" value={text} onChange={(e) => setText(e.target.value)}></input>&nbsp;&nbsp;
                                        <button className="btn btn-primary">Search</button>&nbsp;&nbsp;
                                </form>
                                <button className="btn btn-primary">Logout</button>
                            </Navbar.Collapse>
                        </Navbar.Collapse>
                    </div>
                    : <button className="btn"> <Link to="/user/login"> Login/Register</Link> </button>}
            </Container>
        </Navbar>
    )
}

export default Header