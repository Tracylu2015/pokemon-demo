import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AllPk = () => {
    const [pokes, setPokes] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8000/api/pokemon`)
            .then(res => {
                setPokes([...pokes, ...res.data.data])
            })
            .catch(err => console.log(err))
    }, [])
    console.log(pokes)
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Basic Experience</th>
                        <th>Weight</th>
                    </tr>
                </thead>

                <tbody >
                    {
                        pokes.map((poke, i) => (
                            <tr key={i}>
                                <td>{poke.id}</td>
                                <td>{poke.name}</td>
                                <td>{poke.exp}</td>
                                <td>{poke.weight}</td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
        </div>
    )
}

export default AllPk