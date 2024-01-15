//import PropTypes from 'react'

import { useState } from 'react';

import Box from './Box';
import ScoreBoard from './ScoreBoard';

import '../../styles/tic-tac-toe/TicTacToe.css'

export default function TicTacToe () {
    let [player, setPlayer] = useState(true)
    let [points, setPoints] = useState([0, 0])

    let classTable = [
        "first-box",
        "second-box",
        "third-box",
        "fourth-box",
        "fifth-box",
        "sixth-box",
        "seventh-box",
        "eighth-box",
        "ninth-box"
    ];

    let table = classTable.map ( (value, index) => {
        return ( 
                    <Box 
                        key={index}
                        classBox={value}   
                        player={player} 
                        setPlayer={setPlayer}
                    /> 
                )
    })

    /**
     * funciones
     *  -detectar que el panel esta lleno y no se puede jugar mas, no hay puntos
     *  -detectar que ha habido linea y que el marcador aumente en uno en el ganador
     *      -hacer que un efecto de vistoria
     *  -añadir al mrcador numero de partidas
     */

    return (
        <div className='module Tic-Tac-Toe'>
            <ScoreBoard 
                player={player} 
                points={points}
                setPoints={setPoints}
            />
            <div className='Tic-Tac-Toe_table-game'>
                {table}
            </div>
        </div>
    )
}

/*
TicTacToe.propTypes = {
};*/