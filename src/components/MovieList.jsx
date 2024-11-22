import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovie } from '../fetaures/movieSlice';
import { Link } from 'react-router-dom';

const MovieList = () => {

  const dispatch = useDispatch();
  const { movies, searchResults } = useSelector((state) => state.movie)

  useEffect(() => {
    dispatch(fetchMovie())
  }, [dispatch])

  const displayMovies = searchResults.length > 0 ? searchResults : movies;

  return (
    <div>
      <div className="container mt-4">
        <h1 className="text-center mb-4">Movie List</h1>
        <div className="row g-4">
          {displayMovies.map((movie) => (
            <div className="col-md-4" key={movie.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">{movie.title}</h5>
                  <p className="card-text text-truncate-3">
                    {movie.overview}
                  </p>
                  <p className="text-muted mb-2">
                    <strong>Release Date:</strong> {movie.release_date}
                  </p>
                  <div className="mt-auto">
                    <Link
                      to={`/movieDetails/${movie.id}`}
                      className="btn btn-primary btn-sm w-100"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MovieList