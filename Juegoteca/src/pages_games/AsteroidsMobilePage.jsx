import React, { useEffect } from "react";

const AsteroidsPage = () => {
  useEffect(() => {
    // Redirige automáticamente a la URL del juego Asteroids
    window.location.href = "/Games/asteroids_mobile/index.html"; // Asegúrate de que la ruta sea correcta
  }, []);

  return <div>Redirigiendo al juego...</div>;
};

export default AsteroidsPage;
