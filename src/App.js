import React from 'react'
import Index from './pages/Index'
import UK from './pages/UK';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UKMap from './components/UKMap';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/UK' element={<UK />} />
      </Routes>
      <Navigation />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/uk-map' element={<UKMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;