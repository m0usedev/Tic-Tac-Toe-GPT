import PropTypes from 'prop-types';

import circle from '../../assets/tic-tac-toe/circle.png'
import cross from '../../assets/tic-tac-toe/cross.png'

import '../../styles/tic-tac-toe/Box.css'

export default function Box ({ classBox, positionBox, board, onClick }) {
    /**
     * Las imágenes de los box están ocultas constantemente. Para mostrarlas, el Box realiza lo siguiente:
     * 
     *      data-select={board[positionBox] === 1 ? true : false} 
     *      data-select={board[positionBox] === 0 ? true : false} 
     * 
     * El Box verifica continuamente su posición en el tablero (board). En caso de que sea null, no pasará nada;
     * ninguna imagen se mostrará. Sin embargo, si es 1 o 0, se mostrará la imagen correspondiente.
     * 
     * Esto se debe a que en CSS, si data-select es false, no se muestra, y solo se muestra cuando es true.
     * 
     * Al mismo tiempo, a través de CSS, si el Box contiene un elemento con data-select true, ningún evento
     * de interacción como el click resultará efectivo, para evitar que se cambie la ficha durante
     * la partida. Si las dos imagenes estan en data-select false, se podrá interactuar con el Box.
     * 
     * En el caso de la función del onClick, le damos una función flecha sin parámetros que ejecuta otra con 
     * parámetros, porque si le ponemos directamente una función con parámetros, la ejecuta al cargar el elemento,
     * y así no funciona. Tenemos que pasarle una función sin parámetros.
     */
    return (
        <div className={'Tic-Tac-Toe_Box '+classBox} onClick={() => onClick(positionBox)} >
            <img  
                src={ cross } 
                className='Box_Cross' 
                data-select={board[positionBox]==1 ? true : false} 
            />
            <img  
                src={ circle } 
                className='Box_Circle' 
                data-select={board[positionBox]==0 ? true : false} 
            />
        </div>
    )
}

Box.propTypes = {
    classBox: PropTypes.string,
    positionBox: PropTypes.int,
    board: PropTypes.array,
    onClick: PropTypes.func
};