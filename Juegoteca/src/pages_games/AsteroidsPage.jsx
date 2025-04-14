import React, { useEffect } from "react";

const AsteroidsPage = () => {
  useEffect(() => {
    // Redirige automáticamente a la URL del juego Asteroids
    window.location.href = "/Games/Asteroids/asteroids_index.html"; // Asegúrate de que la ruta sea correcta
  }, []);

  return <div>Redirigiendo al juego...</div>;
};

export default AsteroidsPage;
