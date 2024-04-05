import React, { useState } from 'react';
import './App.css';
import Card from './Card/Card';

function App() {
  const [characterName, setCharacterName] = useState('');
  const [phrase, setPhrase] = useState('');
  const [count, setCount] = useState('');
  const [character, setCharacter] = useState(null);
  const [quotes, setQuotes] = useState([]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (e.target.classList.contains('character')) {
        searchCharacter();
      } else if (e.target.classList.contains('phrase')) {
        handleSubmitPhrase(e);
      } else if (e.target.classList.contains('cont')) {
        handleSubmitCount(e);
      }
    }
  };

  const searchCharacter = async () => {
    try {
      const response = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${encodeURIComponent(characterName)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch character data');
      }
      const data = await response.json();
      if (data.length === 0) {
        throw new Error('No character data found');
      }
      setCharacter(data[0]);
    } catch (error) {
      console.error('Error fetching character data:', error);
      alert('Error fetching character data. Please try again later.');
    }
  };

  const searchRandomCharacter = async () => {
    try {
      const response = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
      if (!response.ok) {
        throw new Error('Failed to fetch random character data');
      }
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      setCharacter(data[randomIndex]);
    } catch (error) {
      console.error('Error fetching random character data:', error);
      alert('Error fetching random character data. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <img src="./src/assets/simpson-tittle.jpg" alt="Título Simpsons" />
      </div>
      
      <div className="blue-container">
        <div className="section">

          <form>
            <div className="form-row">
                <label htmlFor="character">Name:</label>
                <input type="text" className="character" placeholder="Enter the character" onKeyPress={handleKeyPress} />
            </div>
            
            <div className="form-row">
                <label htmlFor="phrase">Quote:</label>
                <input type="text" className="phrase" placeholder="Enter a quote" onKeyPress={handleKeyPress} />
            </div>
            
            <div className="form-row">
                <label htmlFor="cont">Number of phrases:</label>
                <input type="text" className="cont" placeholder="Enter a number" onKeyPress={handleKeyPress} />
            </div>

            <div className="form-row">
              <label htmlFor="random-character" onClick={searchRandomCharacter}>Search random:</label>
              <button className="random-character-btn" type="button">Click here!</button>
            </div>
          </form>

          <div className="character-container">
            {character && (
              <Card
                name={character.character}
                image={character.image}
                quote={character.quote}
              />
            )}
          </div>
        </div>
      </div>

      <div className="attribution">
        <p>Coded by Mariana Salas</p>
      </div>
    </div>
  );
}

export default App;