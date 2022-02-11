import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import ReactPaginate from 'react-paginate';
import unfav from '../images/likeIt.png'
import fav from '../images/like_filled.png'
import currentUser from '../context/CurrentUser'

const AllPk = () => {
    const [pokes, setPokes] = useState([])
    const [size, setSize] = useState(0)
    const [maxPage, setMaxPage] = useState(0)
    const [addFav, setAddFav] = useState(new Set())
    const context = useContext(currentUser)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pokemon?page=${size}`)
            .then(res => {
                setPokes([...res.data.data])
                setMaxPage(res.data.maxPage)
            })
            .catch(err => console.log(err))
    }, [size])

    const handlePageClick = (event) => {
        console.log(event)
        setSize(event.selected)
    }

    const AddFavList = (pokeId) => {
        if (addFav.has(pokeId)){
            let newFav = new Set(addFav)
            newFav.delete(pokeId)
            setAddFav(newFav)
        } else{
            let newFav = new Set(addFav)
            newFav.add(pokeId)
            setAddFav(newFav)
        }
    }


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Basic Experience</th>
                        <th>Weight</th>
                        <th>Action</th>
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
                                {addFav.has(poke.id)
                                    ? <td><input type="image" onClick={() => AddFavList(poke.id)} value="true" src={fav} alt="Like" style={{ width: "20px", height: "20px" }} /></td>
                                    : <td><input type="image" onClick={() => AddFavList(poke.id)} value="false" src={unfav} alt="unLike" style={{ width: "20px", height: "20px" }} /></td>
                                }
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