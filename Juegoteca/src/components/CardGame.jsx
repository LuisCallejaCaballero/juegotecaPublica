// CardGame.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Asegúrate de importar Link
import "../components_css/CardGame.css";
import { supabase } from "../assets/supabaseClient";

const CardGame = ({
  reverse,
  imageSrc,
  title,
  description,
  controls,
  tips,
  tableName,
  link, // Recibe la propiedad link
}) => {
  const [showRanking, setShowRanking] = useState(false);
  const [rankingData, setRankingData] = useState([]); // Para almacenar los datos del ranking

  const handleRankingClick = async () => {
    setShowRanking((prev) => !prev);

    // Si el ranking está siendo mostrado, obtenemos los datos de Supabase
    if (!showRanking) {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .order("points", { ascending: false });

      if (error) {
        console.error(`Error al obtener el ranking desde ${tableName}:`, error);
      } else {
        setRankingData(data);
      }
    }
  };

  return (
    <div className="app-container">
      <div className={`card-info-container ${reverse ? "reverse" : ""}`}>
        <div className={`text-content ${reverse ? "reverse" : ""}`}>
          <h1 className="game-title">{title}</h1>

          <div className="section">
            <h2 className="section-title">Objetivo</h2>
            <p className="section-content">{description}</p>
          </div>

          <div className="section">
            <h2 className="section-title">Controles</h2>
            <ul className="section-list">
              <li>{controls}</li>
            </ul>
          </div>

          <div className="section">
            <h2 className="section-title">Consejo</h2>
            <p className="section-content">{tips}</p>
          </div>

          <div className="button-container">
            {/* Utilizamos el Link que se pasa como prop */}
            <button className="play-button">             {link}
            </button>
            <button className="ranking-button" onClick={handleRankingClick}>
              {showRanking ? "Ocultar Ranking" : "Ranking"}
            </button>
          </div>

          {showRanking && (
            <div className="ranking-card">
              <h3>Ranking</h3>
              {rankingData.length === 0 ? (
                <p>No hay datos disponibles.</p>
              ) : (
                <ul className="ranking-list">
                  {rankingData.map((rank, index) => (
                    <li key={rank.id}>
                      <strong>{index + 1}.</strong> {rank.user} — {rank.points}{" "}
                      pts
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="image-container">
          <div className="mock-image">
            <img src={imageSrc} alt="Game Screenshot" className="game-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardGame;
