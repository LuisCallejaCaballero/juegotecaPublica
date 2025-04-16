import { Routes, Route, useLocation } from "react-router-dom";

// Componentes
import Navbar from "./components/Navbar";
import Home from "./components/Home";

// Importaciones de juegos
import AsteroidsPage from "./pages_games/AsteroidsPage";
import KeniaPage from "./pages_games/KeniaPage";
import TetrisPage from "./pages_games/TetrisPage";
import SopaLetrasPage from "./pages_games/SopaLetrasPage";
import Android from "./pages_games/AsteroidsMobilePage";

function App() {
  const location = useLocation(); // Obtiene la ubicacion actual de la ruta

  // Verifica si estamos en una página de juego
  const isGamePage = location.pathname === "/tetris" || location.pathname === "/asteroids" || location.pathname === "/keniarace" || location.pathname === "/tetris" || location.pathname === "/sopaletras"|| location.pathname === "/Android";

  return (
    <>
      {!isGamePage && <Navbar />} {/* No muestra la Navbar si estamos en un juego */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/asteroids" element={<AsteroidsPage />} />
        <Route path="/keniarace" element={<KeniaPage />} />
        <Route path="/tetris" element={<TetrisPage />} />
        <Route path="/sopaletras" element={<SopaLetrasPage />} />
        <Route path="/Android" element={<Android/>}/>
      </Routes>
    </>
  );
}

export default App;
