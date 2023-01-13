import { useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import cartaMahjong from '../images/cartaMahjong.png';

const Carta = ({ nombre, numero, caraFrontal, girarCarta, cartasSinAcertar, cartasAcertadas }) => {
    const [volteada, setvolteada] = useState(false);
    const [evento, setEvento] = useState(true);

    // Esta función se ejecutará cada vez que el array de las cartas no giradas se modifique
    // Volteamos al estado original
    useEffect(() => {
        if (cartasSinAcertar.includes(numero)) {
            setTimeout(() => setvolteada(false), 700);
        }
    }, [cartasSinAcertar])

    // Quitamos el evento de girar las cartas si ya están bloqueadas
    useEffect(() => {
        if (cartasAcertadas.includes(numero)) {
            setEvento(false);
        }
    }, [cartasAcertadas])

    const handleClick = () => {
        const valor = girarCarta(nombre, numero);
        if (valor == true) {
            setvolteada(!volteada); // Cambiamos el estado de la carta
        }
    }

    return (
        <div className='carta' >
            <ReactCardFlip isFlipped={volteada} >
                <img className='imagen' src={cartaMahjong} alt='back-face' onClick={evento ? handleClick : null} />
                <img className='imagen' src={caraFrontal} alt='front-face' onClick={evento ? handleClick : null} />
            </ReactCardFlip>
        </div>
    )
}

export default Carta