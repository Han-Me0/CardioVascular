import React from 'react'
import Index from './pages/Index'
import UK from './pages/UK';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Index/>}/>
      <Route path='/UK' element={<UK />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App