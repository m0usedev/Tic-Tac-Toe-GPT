import PropTypes from 'prop-types';
import { useState } from 'react';

import circle from '../../assets/tic-tac-toe/circle.png'
import cross from '../../assets/tic-tac-toe/cross.png'

import '../../styles/tic-tac-toe/Box.css'

export default function Box ({ classBox = '', player, setPlayer }) {
    let [chip, setChip] = useState('')

    function putChip () {
        setChip ( player ? circle : cross )
        setPlayer( player ? false : true )
    }

    return (
        <div className={'Tic-Tac-Toe_Box '+classBox} onClick = { putChip }>
            { /*Asociamos el true al circle y el false al cross*/ }
            <img  src={ chip } />
        </div>
    )
}

Box.propTypes = {
    classBox: PropTypes.strin,
    player: PropTypes.bool,
    setPlayer: PropTypes.func
};