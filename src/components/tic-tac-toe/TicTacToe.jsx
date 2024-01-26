//import PropTypes from 'react'

import { useState } from 'react';

import Box from './Box';
import ScoreBoard from './ScoreBoard';

import { referee } from '../../functions/tic-tac-toe_functions'

import '../../styles/tic-tac-toe/TicTacToe.css'

export default function TicTacToe () {
    let [player, setPlayer] = useState(0)
    let [points, setPoints] = useState([0, 0])
    let [board, setBoard] = useState(Array(9).fill(null))

    let tableBoxes = [];

    let onClick = (positionBox) => {
        referee ( player, setPlayer, board, setBoard, points, setPoints, positionBox )
    }

    for (let index = 0; index < 9; index++) {
        tableBoxes[index] = <Box 
                        key={index}
                        classBox={'box-'+index}   
                        positionBox={index}
                        board= {board}
                        onClick= {onClick}
                    /> 
    }

    return (
        <div className='module Tic-Tac-Toe'>
            <ScoreBoard 
                player={player} 
                points={points}
                setPoints={setPoints}
            />
            <div className='Tic-Tac-Toe_table-game'>
                {tableBoxes}
            </div>
        </div>
    )
}

/*
TicTacToe.propTypes = {
};*/