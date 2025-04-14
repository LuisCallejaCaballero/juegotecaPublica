
// Ventana modal
let modal = document.getElementById("ventanaModal");

// Botón que abre el modal
let boton = document.getElementById("abrirModal");

// Hace referencia al elemento <span> que tiene la X que cierra la ventana
let span = document.getElementsByClassName("cerrar")[0];

// Cuando el usuario hace click en el botón, se abre la ventana
boton.addEventListener("click", function () {
    modal.style.display = "block";
});

// Si el usuario hace click en la x, la ventana se cierra
span.addEventListener("click", function () {
    modal.style.display = "none";
});

// Si el usuario hace click fuera de la ventana, se cierra.
window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

///VARIABLES GLOBALES////VARIABLES GLOBALES////VARIABLES GLOBALES////VARIABLES GLOBALES////VARIABLES GLOBALES////VARIABLES GLOBALES////VARIABLES GLOBALES//

const car = document.getElementById("mycar"); //Recojemos el coche

let soundtrack = new Audio('./assets/soundtrack.mp3'); //Musica de fondo
soundtrack.volume = 0.1; //Volumen del audio
let good = new Audio('./assets/10_sound.mp3'); //Audio al alcanzar 10/10 items

let carX = 0; //Posicion del coche
const carWidth = 200; // Ancho del coche

const roadWidth = 620; // Ancho de la carretera
const roadMargin = (roadWidth - carWidth) / 2; // Margen en el medio del road

let puntuacion = 0; //Contador
let items = 0; //Items a recoger

//Contador de preguntas por animal
let leon = 0;
let zebra = 0;
let jirafa = 0;
let cocodrilo = 0;
let buey = 0;
let elefante = 0;
let hipopotamo = 0;
let tigre = 0;
let mono = 0;
let rinoceronte = 0;

const container_objects = document.getElementById("objetos");

let gameStarted = false; // Boolean que indica si el juego empezo
let quizopen = false; // Boolean que indica si se abrio ya el quiz
let juegoEnPausa = false; //Boolean que indica si el juego esta en pausa (Controla)


///VARIABLES GLOBALES////VARIABLES GLOBALES////VARIABLES GLOBALES////VARIABLES GLOBALES////VARIABLES GLOBALES////VARIABLES GLOBALES////VARIABLES GLOBALES//

document.getElementById("start").addEventListener("click", function () { //Al hacer click en start...
    if (!gameStarted) { //Si gameStarted es falso...

        // contador 5 minutos// contador 5 minutos// contador 5 minutos// contador 5 minutos

        const tiempoLimite = 300000; // 5 minutos en milisegundos
        let tiempoRestante = tiempoLimite;
        const tiempoInicial = Date.now();

        function actualizarTiempoRestante() {
            const tiempoTranscurrido = Date.now() - tiempoInicial;
            tiempoRestante = tiempoLimite - tiempoTranscurrido;

            if (tiempoRestante <= 0) {
                clearInterval(tiempoInterval);
                console.log("Tiempo agotado. Fin del juego.");
                endGame();
            }

            // Mostrar el tiempo restante en un elemento HTML
            const minutos = Math.floor(tiempoRestante / 60000);
            const segundos = Math.floor((tiempoRestante % 60000) / 1000);
            document.getElementById('contador-tiempo').innerText = `Tiempo: ${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
        }

        const tiempoInterval = setInterval(actualizarTiempoRestante, 1000);

        // contador 5 minutos// contador 5 minutos// contador 5 minutos// contador 5 minutos// contador 5 

        soundtrack.play(); //Empieza a sonar la musica


        document.getElementById("start").style.display = 'none'; //El boton desaparece
        document.getElementById("abrirModal").style.display = 'none'; //El boton desaparece
        document.getElementById("road").style.animation = 'roadanimation 20s linear infinite'; //Añade la animacion a el div road, para hacer el efecto loop
        document.getElementById("items").innerHTML = "Next Animal: " + items + "/10"; //Añadimos el primero objetivo


        //Hacemos aparecer los animales en el marcador
        document.getElementById("leon").innerHTML = '<img src="./img/animals/leon.png" width="75" height="70">' + leon + " /2 <br>"; //LEON
        document.getElementById("zebra").innerHTML = '<img src="./img/animals/zebra.png" width="75" height="70">' + zebra + " /2  <br>"; //ZEBRA
        document.getElementById("jirafa").innerHTML = '<img src="./img/animals/jirafa.png" width="75" height="70">' + jirafa + " /2  <br>"; //JIRAFA
        document.getElementById("cocodrilo").innerHTML = '<img src="./img/animals/cocodrilo.png" width="75" height="70">' + cocodrilo + " /2  <br>"; //COCODRILO
        document.getElementById("buey").innerHTML = '<img src="./img/animals/buey.png" width="75" height="70">' + buey + " /2  <br>"; //BUEY
        document.getElementById("elefante").innerHTML = '<img src="./img/animals/elefante.png" width="75" height="70">' + elefante + " /2  <br>"; //ELEFANTE
        document.getElementById("hipopotamo").innerHTML = '<img src="./img/animals/hipopotamo.png" width="75" height="70">' + hipopotamo + " /2  <br>"; //HIPOPOTAMO
        document.getElementById("tigre").innerHTML = '<img src="./img/animals/tigre.png" width="75" height="70">' + tigre + " /2  <br>"; //TIGRE
        document.getElementById("mono").innerHTML = '<img src="./img/animals/mono.png" width="75" height="70">' + mono + " /2  <br>"; //MONO
        document.getElementById("rinoceronte").innerHTML = '<img src="./img/animals/rinoceronte.png" width="75" height="70">' + rinoceronte + " /2  <br>"; //RINOCERONTE

        

        setInterval(creacionObjetos, 1000); // Generar un nuevo div cada 2 segundos y suma 1
        setInterval(creacionObjetosBonus, 7000); //Genera un nuevo div cada 5,5 segundos y suma 3
        setInterval(creacionObjetosBonusEspecial, 6000); //Genera un nuevo div cada 5,5 segundos y suma 3
        gameStarted = true; //El juego empezo, ahora es true

        // Actualiza la puntuacion
        setInterval(() => {
            // document.getElementById("score").innerText = `Score : ${puntuacion}`;
            // puntuacion++;

            if (items >= 10) {
                openQuiz(); // Abrimos el quiz
                good.play(); // Sonido efecto good
                items = 0; //Volvemos a 0 items
                document.getElementById("items").innerHTML = "Next Animal:" + items + "/10"; // Aplicamos el cambio
            }

        }, 100);
    }
    // Acabar partida
    if (leon == 2 && zebra == 2 && jirafa == 2 && cocodrilo == 2 && buey == 2 && elefante == 2 && hipopotamo == 2 && tigre == 2 && mono == 2 && rinoceronte == 2) {
        winGame();
    }
});

document.addEventListener("keydown", function (event) {
    console.log("Valor de leon: " + leon);
    if (gameStarted) { //Si gameStarted es true...
        if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") { //Controles para izquierda
            // Mueve el coche hacia la izquierda dentro de los márgenes del road
            if (carX > -roadMargin) {
                carX -= 30;
            }
        } else if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") { //Controles para derecha
            // Mueve el coche hacia la derecha dentro de los márgenes del road
            if (carX < roadMargin) {
                carX += 30;
            }
        }
        // Actualizar la posicion del coche
        car.style.left = carX + "px";
    }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function creacionObjetos() {

    //Si juegoEnPausa es true, esta funcion no realizara el flujo de codigo para crear mas objetos.
    if (juegoEnPausa) {
        return; // Detener la creación de objetos si objetosPausados es verdadero
    }
    let coin_sound = new Audio('./assets/coin.mp3'); //Sonido moneda
    coin_sound.volume = 0.6;
    const div = document.createElement("div"); //Crea el div
    div.className = "interrogante"; //Le asigna la clase interrogante, en el css ya esta crada.

    // Genera una posicion aleatoria dentro del margen de la carretera
    div.style.left = (Math.random() * (roadMargin * 2)) + (window.innerWidth / 2 - roadMargin) + "px";

    // Elimina el div ya sea por bottom de la pantalla o el top del coche, es decir al colisionar
    function eliminarDiv() {
        const info = div.getBoundingClientRect(); //Posicion del div
        const info_car = car.getBoundingClientRect(); //Posicion del coche

        if (info.bottom > window.innerHeight) { //Se bora si sobrepasa los margenes de la pantalla
            div.remove();
        } else if (info.bottom > info_car.top && info.left < info_car.right && info.right > info_car.left) { //Verificacion de colision por todos los lados
            div.remove();
            coin_sound.play(); //Suena la recogida de objeto
            items++; //Suma la recogida
            document.getElementById("items").innerHTML = "Next Animal: " + items + "/10"; //Actualiza el marcador
        }
    }

    // Verificar y eliminar divs que pasen por debajo del margen inferior
    const checkInterval = setInterval(eliminarDiv, 100);

    container_objects.appendChild(div); //Crea el div en pantalla

    // Elimina el checkInterval cuando el div es eliminado
    div.addEventListener("DOMNodeRemoved", function () {
        clearInterval(checkInterval); //Hace el clean del checkInterval de arriba
    });
    return items;
}

function creacionObjetosBonus() {
    //Si juegoEnPausa es true, esta funcion no realizara el flujo de codigo para crear mas objetos.
    if (juegoEnPausa) {
        return; // Detener la creación de objetos si objetosPausados es verdadero
    }
    let bonus = new Audio('./assets/bonus_item.wav'); //Sonido moneda
    bonus.volume = 0.8;
    const div_especial = document.createElement("div"); //Crea el div
    div_especial.className = "interrogante_especial"; //Le asigna la clase interrogante, en el css ya esta crada.

    // Genera una posicion aleatoria dentro del margen de la carretera
    div_especial.style.left = (Math.random() * (roadMargin * 2)) + (window.innerWidth / 2 - roadMargin) + "px";

    // Elimina el div ya sea por bottom de la pantalla o el top del coche, es decir al colisionar
    function eliminarDiv() {
        const info = div_especial.getBoundingClientRect(); //Posicion del div
        const info_car = car.getBoundingClientRect(); //Posicion del coche

        if (info.bottom > window.innerHeight) { //Se bora si sobrepasa los margenes de la pantalla
            div_especial.remove();
        } else if (info.bottom > info_car.top && info.left < info_car.right && info.right > info_car.left) { //Verificacion de colision por todos los lados
            div_especial.remove();
            bonus.play(); //Suena la recogida de objeto
            items++;
            items++; //Suma 3 puntos
            items++;
            document.getElementById("items").innerHTML = "Next Animal: " + items + "/10"; //Actualiza el marcador
        }
    }

    // Verificar y eliminar divs que pasen por debajo del margen inferior
    const checkInterval = setInterval(eliminarDiv, 100);

    container_objects.appendChild(div_especial); //Crea el div en pantalla

    // Elimina el checkInterval cuando el div es eliminado
    div_especial.addEventListener("DOMNodeRemoved", function () {
        clearInterval(checkInterval); //Hace el clean del checkInterval de arriba
    });
    return items;
}

function creacionObjetosBonusEspecial() {

    //Si juegoEnPausa es true, esta funcion no realizara el flujo de codigo para crear mas objetos.
    if (juegoEnPausa) {
        return; // Detener la creación de objetos si objetosPausados es verdadero
    }
    let bonus_especial = new Audio('./assets/bonus_especial.mp3'); //Sonido moneda
    const div_super_especial = document.createElement("div"); //Crea el div
    div_super_especial.className = "interrogante_super_especial"; //Le asigna la clase interrogante, en el css ya esta crada.

    // Genera una posicion aleatoria dentro del margen de la carretera
    div_super_especial.style.left = (Math.random() * (roadMargin * 2)) + (window.innerWidth / 2 - roadMargin) + "px";

    // Elimina el div ya sea por bottom de la pantalla o el top del coche, es decir al colisionar
    function eliminarDiv() {
        const info = div_super_especial.getBoundingClientRect(); //Posicion del div
        const info_car = car.getBoundingClientRect(); //Posicion del coche

        if (info.bottom > window.innerHeight) { //Se bora si sobrepasa los margenes de la pantalla
            div_super_especial.remove();
        } else if (info.bottom > info_car.top && info.left < info_car.right && info.right > info_car.left) { //Verificacion de colision por todos los lados
            div_super_especial.remove();
            bonus_especial.play(); //Suena la recogida de objeto
            items++, items++, items++, items++, items++, items++;
            document.getElementById("items").innerHTML = "Next Animal: " + items + "/10"; //Actualiza el marcador
        }
    }

    // Verificar y eliminar divs que pasen por debajo del margen inferior
    const checkInterval = setInterval(eliminarDiv, 100);

    container_objects.appendChild(div_super_especial); //Crea el div en pantalla

    // Elimina el checkInterval cuando el div es eliminado
    div_super_especial.addEventListener("DOMNodeRemoved", function () {
        clearInterval(checkInterval); //Hace el clean del checkInterval de arriba
    });
    return items;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const preguntas = [
    //LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON//LEON
    {
        boss: "LEON", //Nombre del boss
        pregunta: "¿Cuál es el promedio de vida de un león en la naturaleza?", //Pregunta
        respuestas: ["10 a 15 años", "15 a 20 años", "20-30 años"], //Posibles respuestas
        respuestaCorrecta: 1, //Respuesta [15 a 20 años]
        imagen: "./img/animals/leon.png" //Ruta de imagen de boss
    },
    {
        boss: "LEON",
        pregunta: "¿Qué cazan los leones?",
        respuestas: ["Otros leones", "Cebras y búfalos", "Gacelas e impalas"],
        respuestaCorrecta: 1, //Respuesta [Cebras y búfalos]
        imagen: "./img/animals/leon.png"
    },
    {
        boss: "LEON",
        pregunta: "¿Qué factores determinan el territorio que una manada elige?",
        respuestas: ["Disponibilidad de presas y agua", "Proximidad a otras manadas.", "Distancia del contacto humano"],
        respuestaCorrecta: 2, //Respuesta [Distancia del contacto humano]
        imagen: "./img/animals/leon.png"
    },

    //ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA//ZEBRA
    {
        boss: "CEBRA", //Nombre del boss
        pregunta: "¿Cuál es el continente en el que se encuentran las cebras en su hábitat natural?", //Pregunta
        respuestas: ["Asia", "África", "América del Norte"], //Posibles respuestas
        respuestaCorrecta: 1, // África
        imagen: "./img/animals/zebra.png"//Ruta de imagen de boss
    },
    {
        boss: "CEBRA",
        pregunta: "¿Cuál es el pariente más cercano de las cebras entre los grandes mamíferos terrestres?",
        respuestas: ["Los elefantes", "Los rinocerontes", "Los hipopótamos"],
        respuestaCorrecta: 1, // Los rinocerontes
        imagen: "./img/animals/zebra.png"
    },
    {
        boss: "CEBRA",
        pregunta: "¿Cuál es la dieta principal de las cebras en la naturaleza?",
        respuestas: ["Hierba y plantas", "Insectos", "Carne de otros animales"],
        respuestaCorrecta: 0, // Hierba y plantas
        imagen: "./img/animals/zebra.png"
    },


    //JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA//JIRAFA
    {
        boss: "JIRAFA",
        pregunta: "¿Cuánto tiempo duermen en promedio las jirafas en un día?",
        respuestas: ["2 Horas", "8 horas", "20 Horas"],
        respuestaCorrecta: 0, //2 Horas
        imagen: "./img/animals/jirafa.png"
    },
    {
        boss: "JIRAFA",
        pregunta: "¿Cuál es la longitud aproximada de la lengua de una jirafa?",
        respuestas: ["10 cm", "30 cm", "45 cm"],
        respuestaCorrecta: 2, //45 cm
        imagen: "./img/animals/jirafa.png"
    },
    {
        boss: "JIRAFA",
        pregunta: "¿Cuál es la expectativa de vida promedio de una jirafa en la naturaleza?",
        respuestas: ["10 años", "30 años", "50 años"],
        respuestaCorrecta: 1, //30 años
        imagen: "./img/animals/jirafa.png"
    },

    //COCODRILO//COCODRILO//COCODRILO//COCODRILO//COCODRILO//COCODRILO//COCODRILO//COCODRILO//COCODRILO//COCODRILO//COCODRILO//COCODRILO//COCODRILO//COCODRILO//COCODRILO//COCODRILO//COCODRILO//COCODRILO//COCODRILO//COCODRILO
    {
        boss: "COCODRILO",
        pregunta: "¿Qué grupo de reptiles pertenecen los cocodrilos?",
        respuestas: ["Lagartos", "Serpientes", "Tortugas"],
        respuestaCorrecta: 0, //Lagartos
        imagen: "./img/animals/cocodrilo.png"
    },
    {
        boss: "COCODRILO",
        pregunta: "¿Cuál de los siguientes lugares es más comúnmente el hábitat natural de los cocodrilos?",
        respuestas: ["Desiertos", "Bosques Tropicales", "Montañas"],
        respuestaCorrecta: 1, //Bosques tropicales
        imagen: "./img/animals/cocodrilo.png"
    },
    {
        boss: "COCODRILO",
        pregunta: "¿Cuál es la parte del cuerpo mas resistente de los cocodrilos?",
        respuestas: ["Cola", "Piel", "Ojos"],
        respuestaCorrecta: 1, //Piel
        imagen: "./img/animals/cocodrilo.png"
    },
    //BUEY////BUEY////BUEY////BUEY////BUEY////BUEY////BUEY////BUEY////BUEY////BUEY////BUEY////BUEY////BUEY////BUEY////BUEY////BUEY////BUEY////BUEY////BUEY////BUEY////BUEY////BUEY////BUEY////BUEY////BUEY////BUEY////BUEY//
    {
        boss: "BUEY",
        pregunta: "Característica física distintiva de los bueyes que los diferencia de otros bovinos?",
        respuestas: ["Tamaño y Fuerza", "Pelaje largo y grueso.", "Cuernos largos y afilados"],
        respuestaCorrecta: 0, //Tamaño y Fuerza
        imagen: "./img/animals/buey.png"
    },
    {
        boss: "BUEY",
        pregunta: "¿Cuál es la esperanza de vida promedio de un buey en condiciones normales?",
        respuestas: ["5 Años", "15 Años", "25 Años"],
        respuestaCorrecta: 1, //15 años
        imagen: "./img/animals/buey.png"
    },
    {
        boss: "BUEY",
        pregunta: "¿Qué parte del cuerpo de un buey se utiliza para medir su salud y condición física?",
        respuestas: ["Cola", "Piel", "Lengua"],
        respuestaCorrecta: 2, //Lengua
        imagen: "./img/animals/buey.png"
    },
    //ELEFANTE//ELEFANTE//ELEFANTE//ELEFANTE//ELEFANTE//ELEFANTE//ELEFANTE//ELEFANTE//ELEFANTE//ELEFANTE//ELEFANTE//ELEFANTE//ELEFANTE//ELEFANTE//ELEFANTE
    {
        boss: "ELEFANTE",
        pregunta: "¿Cuál es el elefante más grande del mundo??",
        respuestas: ["Elefante africano", "Elefante asiático", "Elefante pigmeo"],
        respuestaCorrecta: 0, //Elefante africano
        imagen: "./img/animals/elefante.png"
    },
    {
        boss: "ELEFANTE",
        pregunta: "¿Qué extremidad usan los elefantes para tomar agua y llevarla a su boca?",
        respuestas: ["La trompa", "Las patas delanteras", "Las patas traseras"],
        respuestaCorrecta: 0, //La trompa
        imagen: "./img/animals/elefante.png"
    },
    {
        boss: "ELEFANTE",
        pregunta: "Cuántos dedos tienen los elefantes en cada pata delantera?",
        respuestas: ["2", "3", "4"],
        respuestaCorrecta: 0, //Dos
        imagen: "./img/animals/elefante.png"
    },
    //HIPOPOTAMO//HIPOPOTAMO//HIPOPOTAMO//HIPOPOTAMO//HIPOPOTAMO//HIPOPOTAMO//HIPOPOTAMO//HIPOPOTAMO//HIPOPOTAMO//HIPOPOTAMO//HIPOPOTAMO//HIPOPOTAMO//HIPOPOTAMO//HIPOPOTAMO//ELEFANTE
    {
        boss: "HIPOPOTAMO",
        pregunta: "¿Cuál es el nombre que se le da al grupo social en el que viven los hipopótamos?",
        respuestas: ["Rebaño", "Manada", "Banda"],
        respuestaCorrecta: 1, //Manada
        imagen: "./img/animals/hipopotamo.png"
    },
    {
        boss: "HIPOPOTAMO",
        pregunta: "Cuál es el hábitat natural principal de los hipopótamos?",
        respuestas: ["Desiertos", "Bosques tropicales", "Ríos y lagos"],
        respuestaCorrecta: 2, //Ríos y lagos
        imagen: "./img/animals/hipopotamo.png"
    },
    {
        boss: "HIPOPOTAMO",
        pregunta: "Cuál es la principal característica distintiva de la piel de los hipopótamos?",
        respuestas: ["Piel escamosa", "Piel delgada", "Piel gruesa"],
        respuestaCorrecta: 2, //Piel gruesa
        imagen: "./img/animals/hipopotamo.png"
    },
    //TIGRE//TIGRE//TIGRE//TIGRE//TIGRE//ELEFATIGRENTE//TIGRE//TIGRE//TIGRE//TIGRE//TIGRE//TIGRE//TIGRE//TIGRE
    {
        boss: "TIGRE",
        pregunta: "Cuál es el hábitat principal de los tigres en la naturaleza?",
        respuestas: ["Desiertos", "Selvas Tropicales", "Tundras Árticas"],
        respuestaCorrecta: 1, //Selvas tropicales
        imagen: "./img/animals/tigre.png"
    },
    {
        boss: "TIGRE",
        pregunta: "Cuál es el patrón de comportamiento de caza de los tigres?",
        respuestas: ["En grupo", "Durante el día", "En solitario a la noche"],
        respuestaCorrecta: 2, //En solitario a la noche
        imagen: "./img/animals/tigre.png"
    },
    {
        boss: "TIGRE",
        pregunta: "Cuál de las siguientes especies de tigres es la más grande?",
        respuestas: ["Tigre de Bengala", "Tigre Siberiano", "Tigre de Sumatra"],
        respuestaCorrecta: 1, //Tigre Siberiano
        imagen: "./img/animals/tigre.png"
    },
    //MONO//MONO//MONO//MONO//MONO//MONO//MONO//MONO//MONO//MONO//MONO//MONO//MONO//MONO
    {
        boss: "MONO",
        pregunta: "Cuál es la característica más distintiva de los monos tití?",
        respuestas: ["Su pequeño tamaño", "Cola larga", "Pelaje de colores"],
        respuestaCorrecta: 0, //Su pequeño tamaño
        imagen: "./img/animals/mono.png"
    },
    {
        boss: "MONO",
        pregunta: "Cuál es el tipo de hábitat principal de los monos aulladores?",
        respuestas: ["Bosques tropicales", "Desiertos áridos", "Praderas abiertas"],
        respuestaCorrecta: 0, //Bosques tropicales
        imagen: "./img/animals/mono.png"
    },
    {
        boss: "MONO",
        pregunta: "Cuál es la principal fuente de alimento de los monos tití?",
        respuestas: ["Frutas y néctar", "Hojas y brotes", "Insectos y larvas"],
        respuestaCorrecta: 0, //Frutas y néctar
        imagen: "./img/animals/mono.png"
    },
    //RINOCERONTE//RINOCERONTE//RINOCERONTE//RINOCERONTE//RINOCERONTE//RINOCERONTE//RINOCERONTE//RINOCERONTE//RINOCERONTE//RINOCERONTE//RINOCERONTE//RINOCERONTE//RINOCERONTE//RINOCERONTE
    {
        boss: "RINOCERONTE",
        pregunta: "Qué rinoceronte se considera el más grande en términos de tamaño?",
        respuestas: ["El blanco", "El Negro", "El Indio"],
        respuestaCorrecta: 0, //El blanco
        imagen: "./img/animals/rinoceronte.png"
    },
    {
        boss: "RINOCERONTE",
        pregunta: "Qué hacen los hipopótamos para regular su temperatura corporal?",
        respuestas: ["Sumergirse en el agua", "Sacudir su piel", "Cubrirse de lodo"],
        respuestaCorrecta: 2, //Cubrirse de lodo
        imagen: "./img/animals/rinoceronte.png"
    },
    {
        boss: "RINOCERONTE",
        pregunta: "Dónde suelen descansar los hipopótamos durante el día?",
        respuestas: ["En madrigueras", "Bajo los árboles", "En el agua"],
        respuestaCorrecta: 2, //En el agua
        imagen: "./img/animals/rinoceronte.png"
    },
];

const preguntasRespondidas = new Set(); // Almacena preguntas ya respondidas

const maxPreguntasAnimal = 2; //Maximo de preguntas por animal
//Empezamos con todos a 0
const preguntasRespondidasAnimal = {
    LEON: 0,
    CEBRA: 0,
    JIRAFA: 0,
    COCODRILO: 0,
    BUEY: 0,
    ELEFANTE: 0,
    HIPOPOTAMO: 0,
    TIGRE: 0,
    MONO: 0,
    RINOCERONTE: 0
};


function openQuiz() {
    //SONIDOS//SONIDOS//SONIDOS//SONIDOS//SONIDOS//SONIDOS//SONIDOS//SONIDOS//SONIDOS
    let quiz_sound = new Audio('./assets/quiz_sound.mp3'); //Musica de fondo quiz
    quiz_sound.volume = 0.3; //Volumen del audio quiz
    let error = new Audio('./assets/error.mp3'); //Sonido error
    error.volume = 1; //Volumen del audio error
    let correct = new Audio('./assets/correct.mp3'); //Sonido correct
    quiz_sound.play(); //Suena el sonido del quiz


    //MODO PAUSA//MODO PAUSA//MODO PAUSA//MODO PAUSA//MODO PAUSA//MODO PAUSA//MODO PAUSA//MODO PAUSA//MODO PAUSA//MODO PAUSA
    juegoEnPausa = true; //True para modo pausa (Para de crear objetos, ya que no entra en la funcion creacionObjetos)
    document.getElementById('road').style.animation = 'none'; //Paramos el efecto de el road


    //RECOGIDA Y MUESTRA MODAL//RECOGIDA Y MUESTRA MODAL//RECOGIDA Y MUESTRA MODAL
    const modal = document.getElementById('modal'); //Recogemos el modal
    modal.style.display = 'block'; //Hace aparecer el modal

    //Se elige una pregunta aleatoria y se conoce su indice, para utilizar sus datos
    const preguntaIndice = obtenerPreguntaAleatoria(); // Utiliza la función definida abajo para obtener la pregunta aleatoria
    const preguntaActual = preguntas[preguntaIndice]; //Guardamos nuestra pregunta actual
    const boss_counter = preguntaActual.boss; // Conseguimos saber que boss es

    // Rellena el modal con la pregunta y las opciones
    const bossImage = document.getElementById('bossImage'); //Ruta de la imagen
    const boss = document.getElementById('boss'); //Nombre del boss
    const question = document.getElementById('question'); // Texto de la pregunta
    const options = document.getElementById('options'); // Opciones a preguntas
    const checkAnswer = document.getElementById('checkAnswer'); //Boton comprobar


    //Se autocompletan los valores
    bossImage.src = preguntaActual.imagen; //Ruta de la imagen
    boss.innerText = preguntaActual.boss; //Pinta el texto de boss
    question.innerText = preguntaActual.pregunta; //Pinta el texto de la pregunta
    options.innerHTML = ''; //Pinta las opciones posibles


    //Inicia un bucle en el array de respuestas de la pregunta actual, crea un label para cada una, y a ese label le añade un input con sus atributos.
    preguntaActual.respuestas.forEach((respuesta, index) => {
        const label = document.createElement('label'); //Se crea el label para cada respuesta
        label.innerHTML = `<input type="radio" name="answer" value="${index}">${respuesta}` + "<br>"; //Se crea un input de tipo radio con un atributo "name", y se asigna un valor (0, 1, 2, 3)
        options.appendChild(label); //Pinta cada label por respuesta 
    });



    // Se encarga de seleccionar una pregunta aleatoria que no ha sido respondida aun, y de que no se muestre si ya se han respondido 2/2 de ese animal
    function obtenerPreguntaAleatoria() {
        let preguntaIndice = Math.floor(Math.random() * preguntas.length);

        // Verifica que la pregunta no haya sido respondida y que no se haya alcanzado el límite por animal que es 2/2
        while (
            preguntasRespondidas.has(preguntaIndice) ||
            (preguntas[preguntaIndice].boss && preguntasRespondidasAnimal[preguntas[preguntaIndice].boss] >= maxPreguntasAnimal)
        ) {
            preguntaIndice = Math.floor(Math.random() * preguntas.length);
        }

        // Registra la pregunta como respondida y actualiza el contador por animal sumandole 1
        preguntasRespondidas.add(preguntaIndice);
        const boss = preguntas[preguntaIndice].boss;
        if (boss) {
            preguntasRespondidasAnimal[boss]++;
        }

        return preguntaIndice;
    }

    checkAnswer.onclick = () => {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked'); //Recoje la respuesta seleccionada
        if (selectedAnswer) {
            const respuestaIndex = parseInt(selectedAnswer.value, 10); //Convierte el valor obtenido en un número entero
            if (respuestaIndex === preguntaActual.respuestaCorrecta) { //Si la eleccion es igual a la respuesta correcta de la pregunta escogida...
                // Respuesta correcta

                closeQuiz(); //Cerramos el quiz
                quizopen = false; //Ponemos quizopen a false para que se pueda volver a abrir
                correct.play(); //Sonido correct answer
                quiz_sound.pause(); //Pausa a el sonido del quiz

                // Utilizaremos un switch para segun que boss aparezca se sume su recogida
                switch (boss_counter) {
                    case "LEON":
                        leon++;
                        document.getElementById("leon").innerHTML = '<img src="./img/animals/leon.png" width="75" height="70">' + leon + " /2 <br>";
                        break;
                    case "CEBRA":
                        zebra++;
                        document.getElementById("zebra").innerHTML = '<img src="./img/animals/zebra.png" width="75" height="70">' + zebra + " /2 <br>";
                        break;
                    case "JIRAFA":
                        jirafa++;
                        document.getElementById("jirafa").innerHTML = '<img src="./img/animals/jirafa.png" width="75" height="70">' + jirafa + " /2 <br>";
                        break;
                    case "COCODRILO":
                        cocodrilo++;
                        document.getElementById("cocodrilo").innerHTML = '<img src="./img/animals/cocodrilo.png" width="75" height="70">' + cocodrilo + " /2 <br>";
                        break;
                    case "BUEY":
                        buey++;
                        document.getElementById("buey").innerHTML = '<img src="./img/animals/buey.png" width="75" height="70">' + buey + " /2 <br>";
                        break;
                    case "ELEFANTE":
                        elefante++;
                        document.getElementById("elefante").innerHTML = '<img src="./img/animals/elefante.png" width="75" height="70">' + elefante + " /2 <br>";
                        break;
                    case "HIPOPOTAMO":
                        hipopotamo++;
                        document.getElementById("hipopotamo").innerHTML = '<img src="./img/animals/hipopotamo.png" width="75" height="70">' + hipopotamo + " /2 <br>";
                        break;
                    case "TIGRE":
                        tigre++;
                        document.getElementById("tigre").innerHTML = '<img src="./img/animals/tigre.png" width="75" height="70">' + tigre + " /2 <br>";
                        break;
                    case "MONO":
                        mono++;
                        document.getElementById("mono").innerHTML = '<img src="./img/animals/mono.png" width="75" height="70">' + mono + " /2 <br>";
                        break;
                    case "RINOCERONTE":
                        rinoceronte++;
                        document.getElementById("rinoceronte").innerHTML = '<img src="./img/animals/rinoceronte.png" width="75" height="70">' + rinoceronte + " /2 <br>";
                        break;
                }
            } else {
                //Repuesta incorrecta
                error.play(); // Sonido error
            }
        }
    };
    return items;
}

function closeQuiz() {
    //RECOGIDA Y AMAGO MODAL//RECOGIDA Y AMAGO MODAL//RECOGIDA Y AMAGO MODAL
    const modal = document.getElementById('modal');
    modal.style.display = 'none';

    //Salimos del modo pausa, volvemos a añadir la animacion y a false $juegoEnPausa (Para que entre en la funcion creacionObjetos de nuevo)
    juegoEnPausa = false;
    document.getElementById('road').style.animation = 'roadanimation 20s linear infinite';
}

function winGame() {
    juegoEnPausa = true;//Ponemos el juego en pausa
    clearInterval(creacionObjetos);
    clearInterval(creacionObjetosBonus);
    clearInterval(creacionObjetosBonusEspecial);

    // Mensaje temporal al ganar
    alert("FELICIDADES YA SABES TODO SOBRE LA FAUNA ANIMAL");
}

function endGame() {
    juegoEnPausa = true;//Ponemos el juego en pausa
    clearInterval(creacionObjetos);
    clearInterval(creacionObjetosBonus);
    clearInterval(creacionObjetosBonusEspecial);

    // Mensaje temporal al ganar
    alert("EL TIEMPO SE ACABO");
}