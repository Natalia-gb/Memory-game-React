import './App.css';
import { useState, useEffect} from 'react';
import { images } from './utils/importarImagenes';
import Carta from './components/Carta';
import Intentos from './components/Intentos';
import { imgBack } from './utils/importarImgBack';


function App() {
  const [cartas, setCartas] = useState([]);
  const [primeraCarta, setPrimeraCarta] = useState({});
  const [segundaCarta, setSegundaCarta] = useState({});
  const [intentos, setIntentos] = useState(0);
  const [cartasSinVoltear, setCartasSinVoltear] = useState([]);
  const [cartasDeshabilitadas, setCartasDeshabilitadas] = useState([]);

  const barajarCartas = (array) => {
    for(let i = array.length - 1; i > 0; i--){
      let j = Math.floor(Math.random() * (i+1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const sumarIntentos = () => setIntentos(intentos+1);

  useEffect(() => {
    barajarCartas(images);
    setCartas(images);
  }, [])

  // Cada vez que se voltea la segunda carta, se comprueba si las dos son iguales
  useEffect(() => {
    comprobarIguales();
  }, [segundaCarta]);

  const voltearCarta = (nombre, numero) => {
    if (primeraCarta.nombre === nombre && primeraCarta.numero === numero) {
      return false; // Se voltea la misma carta
    }
    
    if (!primeraCarta.nombre) {
      setPrimeraCarta({ nombre, numero });
    }else if (!segundaCarta.nombre) {
      setSegundaCarta({ nombre, numero });
    }
    
    return true;
  }

  const comprobarIguales = () => {
    if (primeraCarta.nombre && segundaCarta.nombre) {
      const union = primeraCarta.nombre === segundaCarta.nombre;
      sumarIntentos();
      union ? bloquearCartas() : voltearDeNuevo();
    }
  }

  // Deshabilitamos las cartas porque ya son iguales, por lo tanto, no se pueden volver a voltear
  const bloquearCartas = () => {
    setCartasDeshabilitadas([primeraCarta.numero, segundaCarta.numero]);
    resetearCartas();
  };

  // Si dos cartas son desiguales, hay que saber cuáles son esas cartas para ponerlas en su posición original
  const voltearDeNuevo = () => {
    setCartasSinVoltear([primeraCarta.numero, segundaCarta.numero]);
    resetearCartas();
  };

  // Esta función transforma ambas cartas en objetos vacíos para que se vuelvan a comprobar
  const resetearCartas = () => {
    setPrimeraCarta({});
    setSegundaCarta({});
  }

  const reiniciarJuego = () => {
    barajarCartas(imgBack);
    setCartas(imgBack);
    setIntentos(0);
  }


  return (
    <div className="app">
      <div className='tablero' >
        <div className='d-flex justify-content-between'>
          <Intentos texto={intentos} />
          <button className='btn btn-danger' onClick={reiniciarJuego}>Reiniciar juego</button>
        </div>
        <h1 className='d-flex justify-content-center align-items-center text-warning'>Juego de memoria</h1>
        {
          cartas.map((carta, index) => (
            <Carta
              key={index}
              nombre={carta.dibujo}
              numero={index}
              caraFrontal={carta.src}
              girarCarta={voltearCarta}
              cartasSinAcertar={cartasSinVoltear}
              cartasAcertadas={cartasDeshabilitadas}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;