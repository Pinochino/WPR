import '../App.css';
function Statusbar({ wordIndex, wordCount, back, next }) {
    return (<div id="status-bar">
        <button onClick={back} disabled={wordIndex === 0}>&larr;</button>
        <strong>{wordIndex + 1}</strong> / <span>{wordCount}</span>
        <button onClick={next} disabled={wordIndex === wordCount - 1}>&rarr;</button>
    </div>);
}

export default Statusbar;