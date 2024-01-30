import PropTypes from 'prop-types';

import circle from '../../assets/tic-tac-toe/circle.png'
import cross from '../../assets/tic-tac-toe/cross.png'

import '../../styles/tic-tac-toe/ScoreBoard.css'

export default function ScoreBoard ( { player, points, victory } ) {
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