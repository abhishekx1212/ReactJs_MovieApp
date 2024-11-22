import React, { useState } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { searchMovie } from '../fetaures/movieSlice';

const NavBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchMovie(query));
  }
  return (
    <Navbar bg="dark" data-bs-theme="dark" style={{ marginBottom: 20 }} className="shadow-lg">
      <div className="container-fluid px-3">
        <Navbar.Brand className="fs-3">SASTA NETFLIX</Navbar.Brand>
        <Nav className="me-auto">
          <Link className="link fs-5" to={"/movieDetails"}>
            MOVIE DETAILS
          </Link>
        </Nav>
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </div>
    </Navbar>
  )
}

export default NavBar
