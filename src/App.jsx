import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MovieDetails from './components/MovieDetails'
import MovieList from './components/MovieList'
import MovieSearch from './components/MovieSearch'
import { Navbar } from 'react-bootstrap'
import NavBar from './components/Navbar'
import Auth from './components/Auth'
import Profile from './components/Profile'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Auth />} />
        <Route path={"/home"} element={<MovieList />} />
        <Route path={"/movieDetails/:id"} element={<MovieDetails />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/movieSearch"} element={<MovieSearch />} />
      </Routes>
    </>
  )
}

export default App
