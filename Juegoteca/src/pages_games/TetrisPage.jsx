import React, { useEffect } from "react";

const TetrisPage = () => {
  useEffect(() => {
    // Redirige automáticamente a la URL del juego Tetris
    window.location.href = "/Games/tetris/index.html"; // Asegúrate de que la ruta sea correcta
  }, []);

  return <div>Redirigiendo al juego...</div>;
};

export default TetrisPage;
