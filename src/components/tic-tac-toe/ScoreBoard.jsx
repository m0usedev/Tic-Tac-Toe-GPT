import PropTypes from 'prop-types';

import circle from '../../assets/tic-tac-toe/circle.png'
import cross from '../../assets/tic-tac-toe/cross.png'

import '../../styles/tic-tac-toe/ScoreBoard.css'

export default function ScoreBoard ( { player, points, victory } ) {
    /**
     * El ScoreBoard contiene dos elementos: ScoreBoard_points y ScoreBoard_victory.
     *
     * En el caso de ScoreBoard_points, muestra la puntuación que lleva cada jugador en victorias, mientras que
     * ScoreBoard_victory muestra al ganador de una partida o si hubo empate.
     *
     * Para determinar si se muestra uno u otro, se controla mediante CSS. Ambos tienen un atributo data-view que
     * corresponde a la primera posición de un array useState llamado victory, que contiene true o false, indicando
     * si hay victoria o no.
     *
     * En caso de no haber victoria (valor false), se seguirá mostrando el tablero de puntos ya que la partida sigue.
     * Pero si es true, significa que la partida ha terminado y hay un ganador o empate, por lo que el marcador no se muestra
     * y se visualiza el anuncio del ganador.
     *
     * - ScoreBoard_points:
     *    Para indicar el turno de partida de cada jugador, cambiamos el color de cada marcador de jugador.
     *    Esto se realiza mediante CSS, donde cada marcador (player-one y player-two) tiene un atributo (data-turn).
     *    Estos están constantemente observando el useState player, que puede ser 1 para cruces o player 2, y 0 para círculos o player 1.
     *    Se realiza una operación booleana, ya que 1 es true y 0 es false, y en función del jugador, el valor de data-turn
     *    será true o false. Si es true, el marcador se coloreará indicando su turno, sino, no se coloreará.
     * 
     *    Además, ambos marcadores contienen un array useState llamado points, donde la primera posición representa los 
     *    puntos del jugador 1 y la segunda los puntos del jugador 2.
     *
     * - ScoreBoard_victory:
     *    ScoreBoard_victory contiene dos elementos: one-player-win y draw-win. El primero muestra qué jugador ganó la partida,
     *    y el segundo anuncia si hubo empate. Para esto, al igual que ScoreBoard_victory, tienen un data-view que determina
     *    si se muestran o no. Estos elementos miran la segunda posición del array useState victory, que es true si hay empate
     *    y false si no lo hay.
     * 
     *    - one-player-win:
     *        Contiene dos imágenes que se muestran en función del jugador que ha ganado la partida, que es el que actualmente
     *        maneja el useState player. Si el jugador es 1 para cruces o player 2, se mostrará una imagen; si es 0 para círculos o player 1,
     *        se mostrará otra.
     * 
     *    - draw-win:
     *        Simplemente muestra su contenido, sin ninguna evaluación adicional.
     */
    return (
        <div className='module Tic-Tac-Toe_ScoreBoard'>
            <div className='ScoreBoard_points' data-view={!victory[0]}>
                <div className='player player-one' data-turn={ !player ? 'play' : 'not-play' }>
                    Player one: { points[0] }
                </div>
                <div className='player player-two' data-turn={ player ? 'play' : 'not-play' }>
                    Player two:{ points[1] }
                </div>
            </div>
            <div className='ScoreBoard_victory' data-view={victory[0]}>
                <div className='one-player-win' data-view={!victory[1]}>
                    <div className='img-player'>
                        <img  
                            src={ cross } 
                            className='Box_Cross'
                            data-select={player==1 ? true : false} 
                        />
                        <img  
                            src={ circle } 
                            className='Box_Circle'
                            data-select={player==0 ? true : false} 
                        />
                    </div>
                    <div className='main-content'>
                        You Win
                    </div>
                </div>
                <div className='draw-win' data-view={victory[1]}>
                    <img  
                        src={ circle } 
                        className='Box_Circle'
                    />
                    <div className='main-content'>
                        Draw
                    </div>
                    <img  
                        src={ cross } 
                        className='Box_Cross'
                    />
                </div>
            </div>
        </div>
    )
}

ScoreBoard.propTypes = {
    player: PropTypes.int,
    points: PropTypes.array,
    victory: PropTypes.bool
};