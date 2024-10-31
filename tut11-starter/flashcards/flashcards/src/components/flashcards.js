import { useEffect, useRef, useState } from "react";

function FlashCards() {

    const [count, setCount] = useState(1);
    const prevBtnRef = useRef(null);
    const nextBtnRef = useRef(null);

    const dict = {
        "pretty": "xinh đẹp",
        "car": "xe hơi",
        "study": "học tập",
        "life": "cuộc sống",
        "enormous": "to lớn",
        "computer": "máy tính"
    };

    const words = Object.keys(dict);
    const meanings = Object.values(dict);

    useEffect(() => {
        if (prevBtnRef.current) {
            prevBtnRef.current.disabled = count <= 1;
        }
        if (nextBtnRef.current) {
            nextBtnRef.current.disabled = count >= words.length;
        }
    }, [count, words.length]);

    const handleNext = () => {
        if (count < words.length) {
            setCount(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (count > 1) {
            setCount(prev => prev - 1);
        }
    }

    return (
        <div id="main">
            <div id="flashcard-container">
                <div className="flashcard-box">
                    <div className="flashcard word">{words[count - 1]}</div>
                    <div className="flashcard definition">{meanings[count - 1]}</div>
                </div>
            </div>
            <div id="status-bar">
                <button ref={prevBtnRef} onClick={handlePrev}>&larr;</button>
                <strong>{count}</strong> / <span>{words.length}</span>
                <button ref={nextBtnRef} onClick={handleNext}>&rarr;</button>
            </div>
        </div>
    );
}

export default FlashCards;
