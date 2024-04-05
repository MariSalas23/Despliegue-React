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
        handleSubmitCharacter(e);
      } else if (e.target.classList.contains('phrase')) {
        handleSubmitPhrase(e);
      } else if (e.target.classList.contains('cont')) {
        handleSubmitCount(e);
      }
    }
  };

  const handleSubmitCharacter = async (e) => {
    e.preventDefault();
    if (characterName.trim() !== '') {
      try {
        const response = await fetch(
          `https://thesimpsonsquoteapi.glitch.me/quotes?character=${encodeURIComponent(
            characterName
          )}`
        );
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
    } else {
      alert('Please enter a character name.');
    }
  };

  const handleSubmitPhrase = async (e) => {
    e.preventDefault();
    const phrase = e.target.value.trim();
    if (phrase !== '') {
      try {
        const response = await fetch(
          `https://thesimpsonsquoteapi.glitch.me/quotes`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch quote data');
        }
        const data = await response.json();
        const matchingQuote = data.find((quote) =>
          quote.quote.toLowerCase().includes(phrase.toLowerCase())
        );
        if (!matchingQuote) {
          throw new Error('No quote data found');
        }
        setCharacter(matchingQuote);
      } catch (error) {
        console.error('Error fetching quote data:', error);
        alert('Error fetching quote data. Please try again later.');
      }
    } else {
      alert('Please enter a phrase.');
    }
  };

  const handleSubmitCount = async (e) => {
    e.preventDefault();
    const count = parseInt(e.target.value);
    if (count >= 1 && count <= 3) {
      try {
        const response = await fetch(
          `https://thesimpsonsquoteapi.glitch.me/quotes?character=${encodeURIComponent(
            characterName
          )}&count=${count}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch quote data for character');
        }
        const data = await response.json();
        setCharacter(data[0]);
      } catch (error) {
        console.error('Error fetching quote data for character:', error);
        alert('Error fetching quote data for character. Please try again later.');
      }
    } else {
      alert('Please enter a number between 1 and 3.');
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
                <input type="text" className="character" placeholder="Enter the character" required onKeyPress={handleKeyPress} />
            </div>
            
            <div className="form-row">
                <label htmlFor="phrase">Quote:</label>
                <input type="text" className="phrase" placeholder="Enter a quote" required onKeyPress={handleKeyPress} />
            </div>
            
            <div className="form-row">
                <label htmlFor="cont">Number of phrases:</label>
                <input type="text" className="cont" placeholder="Enter a number" required onKeyPress={handleKeyPress} />
            </div>

            <div className="form-row">
              <label htmlFor="random-character">Search random:</label>
              <button className="random-character-btn" type="button">Click here!</button>
            </div>
          </form>

          <div className="character-container"> </div>
        </div>
      </div>

      <div className="attribution">
        <p>Coded by Mariana Salas</p>
      </div>
    </div>
  );
}

export default App;