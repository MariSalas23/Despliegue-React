import React from 'react';

function Card({ character }) {
  return (
    <div className="card">
      <img src={character.image} alt="Character" />
      <div>
        <h2>Character: {character.character}</h2>
        <h3>Quotes:</h3>
        <ul>
          {character.quotes.map((quote, index) => (
            <li key={index}>{quote}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Card;