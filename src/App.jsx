import React from 'react'
import { Routes, Route } from 'react-router-dom'
import TeamDirectory from './components/TeamDirectory'
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TeamDirectory />} />
        <Route path="/profile/:id" element={<TeamDirectory />} />
      </Routes>
    </div>
  )
}

export default App
