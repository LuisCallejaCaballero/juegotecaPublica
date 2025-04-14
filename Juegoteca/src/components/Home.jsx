import { useState, useEffect } from "react";
import CardGame from "../components/CardGame";
import { supabase } from "../../supabaseClient";
import HeroSlider from "../components/HeroSlider";
import { Link } from "react-router-dom";
import "../App.css";

const Home = () => {
  const [keniaRaceData, setKeniaRaceData] = useState([]);

  useEffect(() => {
    const fetchKeniaRaceData = async () => {
      const { data, error } = await supabase.from("keniaRace").select("*");
      if (error) {
        console.error("Error al cargar datos de KeniaRace:", error);
      } else {
        setKeniaRaceData(data);
      }
    };

    fetchKeniaRaceData();
  }, []);

  return (
    <>
      <HeroSlider />
      
      {/* Juegos */}
      <div id="keniarace">
        <CardGame
          imageSrc="./img_hero/kenia_hero.gif"
          title={"KeniaRace"}
          description={"Recolecta las monedas, responde a las preguntas y salva el maximo de animales"}
          controls={"WASD o Flechas Direccionales"}
          tips={"Salva el aximo de animales!"}
          tableName={"keniaRace"}
          link={<Link to="/keniarace">Jugar</Link>}
        />
      </div>
      
      <div id="sopaletras">
        <CardGame
          imageSrc="./img_hero/sopadeletras.gif"
          title={"Sopa De Letras"}
          description={"Encuentra todas las palabras ocultas en la sopa"}
          controls={"Usa el mouse para seleccionar las frases"}
          tips={"Ten en cuenta el tiempo restante!"}
          tableName={"sopaDeLetras"}
          link={<Link to="/sopaletras">Jugar</Link>}
        />
      </div>

      <div id="tetris">
        <CardGame
          imageSrc="./img_hero/tetris.gif"
          title={"Tetris"}
          description={"Conecta las formas para seguir con vida"}
          controls={"Flechas direccionales c y espacio"}
          tips={"Recuerda que puedes guardar piezas!"}
          tableName={"tetris"}
          link={<Link to="/tetris">Jugar</Link>}
        />
      </div>

      <div id="asteroids">
        <CardGame
          imageSrc="./img_hero/asteroids.gif"
          title={"Asteroids"}
          description={"Mata a los asteroides y consigue la maxima puntuacion"}
          controls={"WASD o Flechas Direccionales y Espacio para disparar "}
          tips={"Perderas si te golpean 3 veces"}
          tableName={"asteroids"}
          link={<Link to="/asteroids">Jugar</Link>}
        />
      </div>
    </>
  );
};

export default Home;
