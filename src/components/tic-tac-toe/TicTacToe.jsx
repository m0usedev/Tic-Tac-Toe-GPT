//import PropTypes from 'react'

import { useState } from 'react';

import Box from './Box';
import ScoreBoard from './ScoreBoard';
import BaseButton from '../button/BaseButton';

import { referee, reset } from '../../functions/tic-tac-toe_functions'

import '../../styles/tic-tac-toe/TicTacToe.css'

export default function TicTacToe () {
    /**
     * - useState:
     *      - player: maneja el jugador actual de la partida.
     *          - 0: circulos, player 1
     *          - 1: cruces, player 2
     *      - points: es un arrray que maneja la puntuacion de la partida.
     *          - [0]: puntos de player 1, circulos
     *          - [1]: puntos de player 2, cruces
     *      - board: es un array de 9 posiciones que maneja como va la partida.
     *          - null: este valor es de que no hay nada en esa posicion del tablero.
     *          - 0: este valor indica que en esa posicion es circulos.
     *          - 1: este valor indica que en esa posicion es cruces.
     *      - victory: es un array que maneja si la partida ha terminado.
     *          - [0]: esta posicon maneja si la partida ha terminado, true, o no, false.
     *          - [1]: esta poscion maneja si la partida ha sido empate, true, o solo hay un ganador, false.
     * 
     * - variables:
     *      - tableBoxes: esta variable es la que contiene todos los componentes Box que conforman el tablero de juego.
     * 
     * - funcion:
     *      - onClick: esta funcion contiene una funcion flecha que usa la fucnion referee, la cual maneja la partida.
     *                 referee tiene como parametros de entrada todos los elementos que necesita para manejar la partida,
     *                 que se encuentran principalmente en este componenete, TicTacToe, el unico que le falta es 
     *                 la posicion del Box donde se ha decidido colocar una ficha. Asi, hacmeo una funcion flecha
     *                 cuyo unico parametro de entrada es la posicion del Box, y esta funcion onClick sele pasara a todos los
     *                 componentes Box.
     */
    let [player, setPlayer] = useState(0)
    let [points, setPoints] = useState([0, 0])
    let [board, setBoard] = useState(Array(9).fill(null))
    let [victory, setVictory] = useState([false, false])

    let tableBoxes = [];

    let onClick = (positionBox) => {
        referee ( player, setPlayer, board, setBoard, points, setPoints, victory, setVictory, positionBox  )
    }

    /**
     * El siguiente for lo que hace es lo que hace es crear 9 componentes Box, que conformaran cad una de las casillas
     * del talbero de la partida. Se introduciran en el array tableBoxes y se añadiran en el return.
     * 
     * Como key usamos el index.
     * La clase que le atribuira el estilo concreto de su casilla en el talbero es por el nombre box- seguido del numero index que le pertenezca
     * positionBox indica su posicion en el tablero y en el useState board, para poder manejar correctamente la partida
     * board lo necesita para poder saber el Box que contenido tiene durante el transcurso de la partida
     * onClick le pasa la funcion que maneja la partida y que activara cuando se haga click en su casilla
     */

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
            {/**
             * ScoreBoard controla el macador de la partida.
             * 
             * player para saber indicar el jugador que gano la partida y esta jugando en este momento
             * points para mostrar los puntos que lleva cada jugador
             * victory para saber si la partida ha terminado y poder anunciarlo
             */}
            <ScoreBoard 
                player={player} 
                points={points}
                victory={victory}
            />
            <div className='Tic-Tac-Toe_table-game'>
                {tableBoxes}
            </div>
            {/**
             * BaseButton tiene una funcion flecha en el prop onClick porque si declaras una fucnion con parametors de la ejecuta.
             * Hay que meterla en una sin parametros flecha para que no se ejecute al cargar el componente.
             */}
             <BaseButton content='RESET' onClick={ () => reset ( setPlayer, setBoard, setPoints ) }  />
        </div>
    )
}

/*
TicTacToe.propTypes = {
};*/