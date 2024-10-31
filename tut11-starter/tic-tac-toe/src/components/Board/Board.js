import Square from "../Square/Square";

function Board() {
    const Squares = () => {
       return Array.from({length : 9}).map((square, index) => (
        <Square>{index}</Square>
       ))
    }
    return (<div id='Board'>
        <Squares />
    </div>);
}

export default Board;