import React, { useEffect } from "react";

const SopaLetrasPage = () => {
  useEffect(() => {
    // Redirige automáticamente a la URL del juego Sopa de Letras
    window.location.href = "/Games/sopa_letras/index.html"; // Asegúrate de que la ruta sea correcta
  }, []);

  return <div>Redirigiendo al juego...</div>;
};

export default SopaLetrasPage;
