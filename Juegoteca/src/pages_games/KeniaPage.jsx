import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KeniaPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirige automáticamente a la URL del juego
    window.location.href = "/Games/kenia_game/index.html"; // Asegúrate de que la ruta sea correcta
  }, [navigate]);

  return <div>Redirigiendo al juego...</div>;
};

export default KeniaPage;
