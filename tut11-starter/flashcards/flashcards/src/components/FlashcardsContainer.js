import FlashCards from "./flashcards";
import '../App.css';

function FlashContainer({ word, definition }) {
    return (<div className="flashcard-box">
        <FlashCards type="word" text={word} />
        <FlashCards type='definition' text={definition} />
    </div>);
}

export default FlashContainer;