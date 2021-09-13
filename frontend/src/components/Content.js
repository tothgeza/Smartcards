import React, { useState, useEffect } from 'react'

const Content = () => {
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        fetchDecks();
    }, []);

    const fetchDecks = async () => {
        const response = await fetch("/users/1/decks");
        const body = await response.json();
        setDecks(body)
    }

    // fetchDecks()
    return (
        <main className="flex-shrink-1">
            <div className="container">
                <h2>Decks:</h2>
                {decks.map(deck => (
                    <div key={deck.id}>
                        <p>#{deck.id} {deck.title}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Content
