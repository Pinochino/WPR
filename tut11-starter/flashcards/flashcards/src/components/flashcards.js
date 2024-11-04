import '../App.css'
function FlashCards({ type, text }) {
    return (
        <div className={"flashcard " + type}>{text}</div>

    );
}

export default FlashCards;