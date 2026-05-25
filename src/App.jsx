import './css/App.css'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Trailer from './pages/Trailer'
import { Routes, Route } from "react-router-dom"
import { MovieProvider } from './contexts/MovieContext'
import Navbar from './components/NavBar'


function App() {
  return (
    <MovieProvider>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/trailer/:id" element={<Trailer />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
