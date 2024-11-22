import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails } from '../fetaures/movieSlice';
import { useNavigate, useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();  // Get the movie ID from the URL
  const dispatch = useDispatch();
  const { movieDetails, status, error } = useSelector((state) => state.movie);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchMovieDetails(id)); // Fetch movie details
  }, [dispatch, id]);

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "rejected") {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="container mt-4 mb-3">
      {movieDetails && (
        <div className="row">
          <div className="col-md-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="rounded img-fluid shadow-lg"
            />
          </div>
          <div className="col-md-8">
            <h2>{movieDetails.title}</h2>
            <p><strong>Overview:</strong> {movieDetails.overview}</p>
            <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
            <p><strong>Vote Average:</strong> {movieDetails.vote_average}</p>
            <p><strong>Genres:</strong> {movieDetails.genres?.map((genre) => genre.name).join(", ")}</p>
            <p><strong>Language:</strong> {movieDetails.original_language}</p>
            <p><strong>Adult:</strong> {movieDetails.adult ? "Yes" : "No"}</p>
            <p className='btn btn-primary d-block py-1' style={{width:"80px"}} onClick={() => navigate("/home")}><strong>BACK</strong></p>            
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
              alt={movieDetails.title}
              className="rounded img-fluid mt-4"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default MovieDetails
