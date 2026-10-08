import { useState } from 'react'
import './Styles.css';
import { Link } from 'react-router-dom';

function CardsAnimation() {
    const [cards, setCards] = useState<string[]>([]);
    const handleDrawCards = () => {
        if (cards.length === 0) {
            setCards(Array.from({ length: 10 }).map((_, idx) => ('Index: ' + idx)));
        } else {
            setCards([]);
        }
    }

    return (
        <>
            <Link to="/" className="text-blue-600 hover:underline">
                ← Back to Home
            </Link>
            <div className="parent-container">
                <button style={{
                    margin: "1rem",
                    border: "2px solid black",
                    padding: "1rem",
                    borderRadius: "10px"
                }} onClick={handleDrawCards}>Draw Cards</button>
                <div className="cards-container">
                    {
                        cards.map((card, index) => {
                            return <div
                                className="item"
                                key={index}
                                style={{ animationDelay: `${index * 0.2}s` }}
                            > {card} </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default CardsAnimation
