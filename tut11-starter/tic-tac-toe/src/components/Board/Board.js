import Square from "../Square/Square";
import React from 'react';

function Board() {

    const squares = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const handleClick = (index) => {
        console.log('Click' + index);
    }

    return (
        <div id='Board'>
            {
                Array.from(squares).map((s, i) => (
                    <Square key={i} value={s} onSquareClick={() => handleClick(s)} />
                )
                )
            }
        </div>);
}

export default Board;