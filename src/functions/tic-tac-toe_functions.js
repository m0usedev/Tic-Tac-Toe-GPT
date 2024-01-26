

export function referee ( player, setPlayer, board, setBoard, points, setPoints, positionBox ) {
    const workBoard = boardUpdate ( player, board, setBoard, positionBox )
    const validation = boardValiation ( workBoard, points, setPoints, player, setPlayer )
    validation ? resetBoard ( setPlayer, setBoard ) : null
}

function boardUpdate ( player, board, setBoard, positionBox ) {
    const workBoard = board.map( (value, index) => {
                            if(index == positionBox) {
                                return player ? 1 : 0;
                            }
                            return value;
                        })
    setBoard ( workBoard );
    return workBoard;
}

function boardValiation ( workBoard, points, setPoints, player, setPlayer) {
    // evaluar partida
    let [evalResult, evalType] = horizontalVictory ( workBoard, player )
    // evaluar resultado
    if ( evalResult && evalType != 'Draw' ){
        setPoints ( [ player == 0 ? points[0]+1 : points[0], 
                    player == 1 ? points[1]+1 : points[1] ] )
        return true
    } else if ( !evalResult ) {
        setPlayer ( player ? 0 : 1 )
        return false
    } else {
        return true
    }
}

function resetBoard ( setPlayer, setBoard ) {
    setBoard(Array(9).fill(null))
    setPlayer ( 0 )
}

function horizontalVictory ( workBoard, player ) {
    let row =  Math.sqrt(workBoard.length)

    for ( let i = 0; i < row; i++ ) {
        let contador = 0
        for ( let j = i*row; j < (i+1)*row; j++ ) {
            if ( workBoard[j] == player) {
                contador++
            }
        }
        if ( contador == row ) {
            return [true, 'Horizontal']
        }
    }

    return verticalVictory ( workBoard, player, row )
}

function verticalVictory ( workBoard, player, row ) {
    for ( let i = 0; i < row; i++ ) {
        let contador = 0
        for ( let j = 0; j < row; j++ ) {
            if( workBoard [ i + (j*row) ] == player ) {
                contador++
            }
        }
        if( contador == row ){
            return [true, 'Vertical']
        }
    }

    return diagonalVictory ( workBoard, player, row )
}

function diagonalVictory ( workBoard, player, row ) {
    const numDiagonal = 2;
    
    for ( let i = 0; i < numDiagonal; i++ ) {
        let contador = 0
        //diagonal de izquierda a derecha
        for ( let j = 0; j < row; j++ ) {
            if( workBoard [ j + (j*row) ] == player ) {
                contador++
            }
        }
        if ( contador == row ) {
            return [true, 'Diagonal']
        }
    }

    for ( let i = 0; i < numDiagonal; i++ ) {
        let contador = 0
        //diagonal de derecha a izquierda
        for ( let j = 0; j < row; j++ ) {
            if ( workBoard [ (row-1)*(j+1) ] == player ) {
                contador++
            }
        }
        if ( contador == row ) {
            return [true, 'Diagonal']
        }
    }

    return drawVictory ( workBoard )
}

function drawVictory ( workBoard ) {
    return [ !workBoard.some(elemento => elemento === null), 'Draw' ]
}

/**
 * [0][1][2]
 * [3][4][5]
 * [6][7][8]
 */