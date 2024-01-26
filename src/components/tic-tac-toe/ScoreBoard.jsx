import PropTypes from 'prop-types';

import '../../styles/tic-tac-toe/ScoreBoard.css'

export default function ScoreBoard ( { player, points } ) {
    return (
        <div className='Tic-Tac-Toe_ScoreBoard'>
            <div className='player player-one' data-turn={ !player ? 'play' : 'not-play' }>
                Player one: { points[0] }
            </div>
            <div className='player player-two' data-turn={ player ? 'play' : 'not-play' }>
                Player two:{ points[1] }
            </div>
        </div>
    )
}

ScoreBoard.propTypes = {
    player: PropTypes.bool,
    points: PropTypes.array
};