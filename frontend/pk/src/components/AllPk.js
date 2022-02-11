import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';

const AllPk = () => {
    const [pokes, setPokes] = useState([])
    const [size, setSize] = useState(0)
    const [maxPage, setMaxPage] = useState(20)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pokemon?page=${size}`)
            .then(res => {
                setPokes([...res.data.data])
                // setMaxPage(res.data.data.maxPage)
            })
            .catch(err => console.log(err))
    }, [size])
    
    const handlePageClick = (event) => {
        console.log(event)
        setSize(event.selected)
    };

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
            <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={maxPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                activeClassName="active"
            />
        </div>
    )
}

export default AllPk