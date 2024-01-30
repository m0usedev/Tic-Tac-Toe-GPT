//import PropTypes from 'react'

import { useState } from 'react';

import Box from './Box';
import ScoreBoard from './ScoreBoard';
import BaseButton from '../button/BaseButton';

import { referee, reset } from '../../functions/tic-tac-toe_functions'

import '../../styles/tic-tac-toe/TicTacToe.css'

export default function TicTacToe () {
    let [player, setPlayer] = useState(0)
    let [points, setPoints] = useState([0, 0])
    let [board, setBoard] = useState(Array(9).fill(null))

    let [victory, setVictory] = useState([false, false]) //[0]si hay victoria o no, y [1] si es empate o no

    let tableBoxes = [];

    let onClick = (positionBox) => {
        referee ( player, setPlayer, board, setBoard, points, setPoints, victory, setVictory, positionBox  )
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
                victory={victory}
            />
            <div className='Tic-Tac-Toe_table-game'>
                {tableBoxes}
            </div>
             <BaseButton content='RESET' onClick={ () => reset ( setPlayer, setBoard, setPoints ) }  />
        </div>
    )
}

/*
TicTacToe.propTypes = {
};*/