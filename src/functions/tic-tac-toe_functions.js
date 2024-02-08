/**
 * blocking es una variable que controla si se pueden ejecutar las funciones o no.
 *      - false: se peuden ejecutar las fucniones referee y reset
 *      - true: no se peuden ejecutar las fucniones referee y reset, esto debido a 
 *              que se esta anunciando el ganador de la partida, y al ejecutare la 
 *              funcion resetBoard de la funcion referee dentro de 3 segundos de anunciarlo
 *              se romperia el juego si se pudiera interactuar con la tabla o intentar resetearla.
 */
let blocking = false;

/**
 * reset es la fucion encargada de resetear tanto el tablero como los puntos de los jugadores, 
 * solo se ejecutara si blocking es false, por tanto si no se esta anunciando el ganador de una 
 * partida, para evitar problemas
 */
export function reset ( setPlayer, setBoard, setPoints ) {
    if(!blocking) {
        resetBoard ( setPlayer, setBoard )
        setPoints([0, 0])
    }
}

/**
 * referee es la funcion encargada de controlar toda la partida. Solo se ejecutara si blocking es false, 
 * por tanto si no se esta anunciando el ganador de una partida, para evitar problemas.
 * 
 * 1.boardUpdate: primero ejecuta esta funcion que actualiza el tablero, añadiendo el ultimo movimiento.
 * 2.boardValiation: segundo ejecuta esta funcion con el board actualizado para evaluar si hay un ganador 
 *                   o un empate. devolvera true si la aprtida termino o false si no hay victoria todavia.
 * 3.resetBoard: tercero evalua si boardValiation devuelve true o false, si es true, la partida ha terminado 
 *               ejecutara en 3 segundo resetBoard, debido a que en ese caso en boardValiation se ha anunciado el ganador o 
 *               si hay empate y quiero dejar el cartel y la partida temrinada 3 segundos antes de iniciarla de nuevo.
 *               En caso de que la partida no terminase, false, no la reseteamos, y en boardValiation no se habra anunciado el ganador.
 */

export function referee ( player, setPlayer, board, setBoard, points, setPoints, victory, setVictory, positionBox ) {
    if(!blocking) {
        const workBoard = boardUpdate ( player, board, setBoard, positionBox )
        const validation = boardValiation ( workBoard, points, setPoints, player, setPlayer, victory, setVictory )
        validation ? 
            setTimeout( () => 
                        resetBoard ( setPlayer, setBoard, player, victory, setVictory ) 
                        , 3000)
            : null
    }
}

/**
 * boardUpdate se encarga de actualizar la partida en el board con la ultima ficha añadida por el ultimo jugadro, el actual.
 * 
 * Esta actualizacion se hace en otra varialbe workBoard para actualziar despues con el setBoard el useState y despues devolverlo 
 * para trabajar con ese array de la partida y no con el useState board, ya que daba problemas.
 */

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

/**
 * boardValiation se encarga de coprobar si hay un ganador en la partida o es empate.
 * 
 * Para eso llamma a horizontalVictory que evaluara si hay una victoria en horizontal en la partida, 
 * en caso contrario llamara a mas funciones, que se comentan mas abajo.
 * 
 * Lo que devolvera al final seran dos valores: 
 *      - evalResult: que es true si la partida tiene un ganador, o false si no.
 *      - evalType: en string el tipo de victoria que hay.
 *          - Horizontal: la victoria es hirizontal
 *          - Vertical: la victoria es en vertical
 *          - Diagonal: la victoria es en diagonal
 *          - Draw: todo el tablero esta completo y no hay un ganador, es empate
 * 
 * 1. ( evalResult && evalType != 'Draw' ): en caso de que evalResult sea true, hay vicotria, y evalType sea distinto de Draw, que no haya un empate,
 *                                          se actalizara victory con setVictory a [true, false], victoryio y no empate; poinste se actualizara poniendo 
 *                                          un punto mas al jugador actual, que es el que ha ganaod la partida; blocking se cambiara a true, para evitar 
 *                                          que se pueda hacer nada mas mientras se anuncia el ganador; y se devolvera true, hay victoria.
 * 
 * 2. ( !evalResult ): en caso de que la anterior condicion no se cumpla se evalua si evalResult es false, si es false es que la partida aun no ha terminado, 
 *                     por lo tanto no hay victoria y la partida tiene que seguir. Se actualiza al sigueinte jugador player con setPlayer y se devuelve flase, 
 *                     la partida no ha terminado.
 * 
 * 3. En caso de que la anterior con dicion no se cumpla, evalResult es true, es que la partida ha terminado, pero por empate, por,lo tanto no ha ganado nadie.
 *    Se procede a actualizar victory con setVictory a [true, true], la partida ha temrinado y por empate; blocking se cambiara a true, para evitar que se pueda 
 *    hacer nada mas mientras se anuncia el fin de la partida; y se devuelve true, ya que hay vicotia y la aprtida ha terminado.
 */

function boardValiation ( workBoard, points, setPoints, player, setPlayer, victory, setVictory ) {
    // evaluar partida
    let [evalResult, evalType] = horizontalVictory ( workBoard, player )
    // evaluar resultado
    if ( evalResult && evalType != 'Draw' ){
        setVictory( [true, false] )
        setPoints ( [ player == 0 ? points[0]+1 : points[0], 
                    player == 1 ? points[1]+1 : points[1] ] )
        blocking = true
        return true
    } else if ( !evalResult ) {
        setPlayer ( player ? 0 : 1 )
        return false
    } else {
        setVictory( [true, true] )
        blocking = true
        return true
    }
}

/**
 * resetBoard se encarga de poner victory de nuevo en [false, false], para finalizar el anuncio del ganador o empate de la partida, o null, no hace nada.
 * Este ultimo caso es por que puede llamarle la funcion reset, que se encarga de decir que reinicie todo, ahi no se anuncio nada, por tanto no hay que reseterar nada.
 * Despues se vuelve a iniciar board con setBoard a un array de nueve posiciones null, el tablero vacio, setPlayer se pone al jugador contraro al contrario del actual, 
 * esto en el caso de que haya sido por victoria de partida, para que empiece el jugador contrario al que termino la anterior, y se inicializa player en true en los paraemtros 
 * por si no se pasa donde se llame a la funcion resetBoard, que seria en la funcion reset, para que asi empiece el juigador de circulas 0 la nueva partida; y se pone blocking en false,
 * esto es para el caso de que llamase a la funcion resetBoard la funcion referee, ya que se habria anunciado el ganador y ya puede volver a interactuarse con el tablero o el boton reset.
 */

function resetBoard ( setPlayer, setBoard, player = true, victory = null, setVictory = null ) {
    victory != null ? setVictory([false, false]) : null
    setBoard(Array(9).fill(null))
    setPlayer ( player ? 0 : 1 )
    blocking = false
}

/**
 * horizontalVictory se encarga de determinar si una partida es una victoria horizontal.
 * 
 * 1. El primer bucle controla el número de filas a revisar del array, que siempre será en función de la raíz cuadrada de la longitud del array.
 *    Si el array tiene longitud 9, es un tablero 3x3, por lo tanto, hay que revisar 3 filas para ver si hay victoria en alguna.
 *  
 *    Este primer nivel inicia un contador en 0 en cada iteración, el cual controlará si hay victoria en una fila.
 *
 * 2. Este segundo bucle se encarga de recorrer las posiciones correspondientes a cada fila.
 *      1. 'j' empieza en 'i * row', es decir, el número de fila multiplicado por la dimensión del tablero. En un caso de 3x3:
 *          1. 0 * 3 = 0
 *          2. 1 * 3 = 3
 *          3. 2 * 3 = 6
 *         Estas son las tres primeras posiciones de cada fila en un 3x3:
 *          [0][ ][ ]
 *          [3][ ][ ]
 *          [6][ ][ ]
 *      2. 'j' se itera mientras sea menor a '(i + 1) * row', es decir, la primera posición de la siguiente fila. En un caso de 3x3:
 *          1. (0 + 1) * 3 = 3
 *          2. (1 + 1) * 3 = 6
 *          3. (2 + 1) * 3 = 9
 *         Estas son las primeras posiciones de las siguientes filas:
 *          [ ][ ][ ]
 *          [3][ ][ ]
 *          [6][ ][ ]
 *          [9]
 *      3. por tanto en la primera iteracion j pasara por: 0,1,2; en la segunda: 3,4,5...
 * 
 * 3. Dentro del segundo bucle, se evalúa si la posición 'j' en 'workBoard' corresponde al 'player' actual, es decir, al que hizo el último movimiento,
 *    y por lo tanto, al que sería el ganador. En caso de ser verdadero, el contador suma 1.
 * 
 * 4. Una vez terminado el segundo bucle, se evalúa si el contador es igual a la dimensión del tablero, lo que indicaría que hay victoria horizontal.
 *    En un 3x3, debería ser: 3 == 3, tres posiciones con el mismo 'player' en una fila. En ese caso, se corta el flujo de código y se devuelven dos valores en 
 *    un array [true, 'Horizontal']: hay victoria y es horizontal.
 * 
 * 5. Si nunca se encuentra una victoria horizontal, se llamará a la función verticalVictory para evaluar si la hay en vertical, pasándole el tablero,
 *    el 'player' actual que hizo el último movimiento y las dimensiones del tablero, para no tener que volver a calcularlas. En un 3x3, se le pasaría 3,
 *    que son las dimensiones de un tablero de un array de 9 posiciones.
 */

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

/**
 * verticalVictory se encarga de determinar si una partida es una victoria vertical.
 * 
 * 1. El primer bucle controla el número de columnas a revisar del array, que siempre será en función de la raíz cuadrada de la longitud del array.
 *    Si el array tiene longitud 9, es un tablero 3x3, por lo tanto, hay que revisar 3 columnas para ver si hay victoria en alguna.
 *  
 *    Este primer nivel inicia un contador en 0 en cada iteración, el cual controlará si hay victoria en una columna.
 *
 * 2. Este segundo bucle se encarga de recorrer las posiciones correspondientes a cada columna.
 *      1. 'j' siempre empieza en 0, y el bucle continúa mientras sea menor que la dimensión del tablero. En un 3x3, sería 3.
 *      2. Dentro, se evalúa 'workBoard[i + (j * row)] == player'. Lo que hace es mirar la posición correspondiente en la columna especificada.
 *         'i' maneja la columna a revisar y 'j' la posición dentro de esa columna.
 *          Para revisar la primera columna en un 3x3:
 *          1. 0 + (0 * 3) = 0
 *          2. 0 + (1 * 3) = 3
 *          3. 0 + (2 * 3) = 6
 *         Estas son las tres posiciones de la primera columna a revisar:
 *          [0][ ][ ]
 *          [3][ ][ ]
 *          [6][ ][ ]
 *         Un ejemplo más con la segunda columna:
 *          1. 1 + (0 * 3) = 1
 *          2. 1 + (1 * 3) = 4
 *          3. 1 + (2 * 3) = 7
 *         Estas son las tres posiciones de la segunda columna a revisar:
 *          [ ][1][ ]
 *          [ ][4][ ]
 *          [ ][7][ ]
 * 
 * 3. Dentro del segundo bucle, se evalúa si el valor de 'workBoard' corresponde al 'player' actual, es decir, al que hizo el último movimiento.
 *    Si es así, se suma 1 al contador.
 * 
 * 4. Una vez terminado el segundo bucle, se evalúa si el contador es igual a la dimensión del tablero, lo que indica que hay victoria vertical.
 *    En un 3x3, debería ser: 3 == 3, tres posiciones con el mismo 'player' en una columna. En ese caso, se corta el flujo de código y se devuelven dos valores en 
 *    un array [true, 'Vertical']: hay victoria y es vertical.
 * 
 * 5. Si nunca se encuentra una victoria vertical, se llamará a la función diagonalVictory para evaluar si la hay en diagonal, pasándole el tablero,
 *    el 'player' actual que hizo el último movimiento y las dimensiones del tablero, para no tener que volver a calcularlas. En un 3x3, se le pasaría 3,
 *    que son las dimensiones de un tablero de un array de 9 posiciones.
 */


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

/**
 * diagonalVictory se encarga de determinar si una partida es una victoria diagonal.
 * 
 * 1. La constante 'numDiagonal' representa el número de diagonales diferentes que se deben revisar. En un juego de tres en raya, hay dos diagonales principales.
 * 
 * 2. Se ejecutan dos bucles 'for', uno para cada dirección de la diagonal.
 *      - El primer bucle itera sobre las diagonales de izquierda a derecha.
 *      - El segundo bucle itera sobre las diagonales de derecha a izquierda.
 * 
 * 3. Dentro de cada bucle, se inicia un contador en 0 que se utilizará para contar las coincidencias del 'player' en la diagonal actual.
 * 
 * 4. Para la diagonal de izquierda a derecha, se recorre cada posición en la diagonal, comenzando desde la esquina superior izquierda (0) hasta la esquina 
 *    inferior derecha (8) en un tablero 3x3.
 *      - En cada iteración, se comprueba si el valor en la posición (j) del 'workBoard' es igual al 'player'. Si es así, se incrementa el contador.
 * 
 *         Ejemplo visual para la diagonal de izquierda a derecha en un tablero 3x3:
 *        
 *          1. 0 + (0 * 3) = 0
 *          2. 1 + (1 * 3) = 4
 *          3. 2 + (2 * 3) = 8
 *          
 *          [0][ ][ ]
 *          [ ][4][ ]
 *          [ ][ ][8]
 * 
 * 5. Para la diagonal de derecha a izquierda, se recorre cada posición en la diagonal, comenzando desde la esquina superior derecha (2) hasta la esquina 
 *    inferior izquierda (6) en un tablero 3x3.
 *      - En cada iteración, se calcula la posición utilizando la fórmula (row - 1) * (j + 1), donde 'row' es la dimensión del tablero. Esto permite recorrer 
 *        la diagonal de derecha a izquierda.
 *      - Se comprueba si el valor en la posición calculada del 'workBoard' es igual al 'player'. Si es así, se incrementa el contador.
 * 
 *         Ejemplo visual para la diagonal de derecha a izquierda en un tablero 3x3:
 *        
 *          1. (3 - 1) * (0 + 1) = 2
 *          2. (3 - 1) * (1 + 1) = 4
 *          3. (3 - 1) * (2 + 1) = 6
 *        
 *          [ ][ ][2]
 *          [ ][4][ ]
 *          [6][ ][ ]
 * 
 * 6. Después de cada bucle, se verifica si el contador es igual a la dimensión del tablero. Si lo es, significa que se ha encontrado una victoria diagonal y se 
 *    devuelve un array con el valor 'true' y la dirección 'Diagonal'.
 * 
 * 7. Si ninguno de los bucles encuentra una victoria diagonal, se llama a la función 'drawVictory' para verificar si hay un empate en la partida.
 */

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

/**
 *  drawVictory se encarga de determinar si una partida es empate.
 * 
 * Esta evalucion es la ultima porque es tan simple como comproibar que no queda ningun elemento null en el array,
 * por lo tanto no se peude seguir jugando, y si se ha llegado a drawVictory es que no hay ningun ganador.
 * 
 * Porcedemos a devolver [true, 'Draw'], victoria y es empate.
 *  
 */

function drawVictory ( workBoard ) {
    return [ !workBoard.some(elemento => elemento === null), 'Draw' ]
}

/**
 * [0][1][2]
 * [3][4][5]
 * [6][7][8]
 */