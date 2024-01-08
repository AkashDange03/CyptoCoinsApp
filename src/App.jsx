import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { Home,Nav, Exchanges, Coins,CoinDetails } from './components'

function App() {
  return (
    <>
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exchange" element={<Exchanges />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
