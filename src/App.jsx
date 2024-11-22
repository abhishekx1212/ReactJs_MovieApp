import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MovieDetails from './components/MovieDetails'
import MovieList from './components/MovieList'
import MovieSearch from './components/MovieSearch'
import { Navbar } from 'react-bootstrap'
import NavBar from './components/Navbar'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path={"/"} element={<MovieList />} />
        <Route path={"/movieDetails/:id"} element={<MovieDetails />} />
        <Route path={"/movieSearch"} element={<MovieSearch />} />
      </Routes>
    </>
  )
}

export default App
