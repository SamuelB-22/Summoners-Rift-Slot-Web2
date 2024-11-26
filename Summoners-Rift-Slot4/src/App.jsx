import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'


import Slot from '../view/Slot.jsx'
function App() {

  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Slot />} />  
        </Routes>
</BrowserRouter>
  )
   
}

export default App
