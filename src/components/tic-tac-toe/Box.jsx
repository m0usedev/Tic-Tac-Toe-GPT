import PropTypes from 'prop-types';

import circle from '../../assets/tic-tac-toe/circle.png'
import cross from '../../assets/tic-tac-toe/cross.png'

import '../../styles/tic-tac-toe/Box.css'

export default function Box ({ classBox, positionBox, board, onClick }) {
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