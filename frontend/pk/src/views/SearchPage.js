import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import currentUser from '../context/CurrentUser'

const SearchPage = () => {
    const { text } = useParams()
    const [results, setResults] = useState([])
    const context = useContext(currentUser)

    useEffect(() => {
        let user_id = context.currentUser.id
        axios.post('http://localhost:8000/api/pokemon/search', {text, user_id})
            .then(res => {
                setResults([...res.data])
            })
            .catch(err => console.log(err))
    }, [])
    console.log(results)
    return (
        <div>
            <h2>Search result from favorites with {text}</h2>
            <ul>
                {results.map((p, i) => (
                    <li key={i}>{p.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default SearchPage