import React, { useState } from 'react';
import './App.css';
import Card from './Card/Card';

function App() {
  const [character, setCharacter] = useState(null);
  const [count, setCount] = useState(1);

  // Función para buscar las frases de un personaje específico
  async function fetchQuotesForCharacter(name, count) {
    const url = `https://thesimpsonsquoteapi.glitch.me/quotes?character=${encodeURIComponent(name)}&count=${count}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch quote data for character');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching quote data for character');
    }
  }

  const searchCharacter = async (characterName) => {
    try {
      const response = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${encodeURIComponent(characterName)}`);
      const data = await response.json();
      if (data.length > 0) {
        setCharacter({
          name: data[0].character,
          image: data[0].image,
          quotes: data.slice(0, 1).map(quote => quote.quote)
        });
      } else {
        setCharacter(null);
        alert('No character found with that name.');
      }
    } catch (error) {
      console.error('Error searching character:', error);
      alert('An error occurred while searching for the character. Please try again later.');
    }
  };

  const searchByPhrase = async () => {
    try {
      const response = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
      const data = await response.json();
      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomQuote = data[randomIndex];
        await searchCharacter(randomQuote.character);
      } else {
        setCharacter(null);
        alert('No quotes found in the API.');
      }
    } catch (error) {
      console.error('Error searching by phrase:', error);
      alert('An error occurred while searching by phrase. Please try again later.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.classList.contains('character')) {
      searchCharacter(e.target.value); 
    } else if (e.key === 'Enter' && e.target.classList.contains('cont')) {
      const inputCount = parseInt(e.target.value);
      if (inputCount >= 1 && inputCount <= 3) {
        setCount(inputCount);
        searchCharacter(document.querySelector('.character').value, inputCount);
      } else {
        alert('Please enter a number between 1 and 3.');
      }
    }
  };

  const handleRandomButtonClick = () => {
    searchByPhrase();
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
                <label htmlFor="cont">Number of phrases:</label>
                <input type="number" min="1" max="3" className="cont" placeholder="Enter a number" onChange={(e) => setCount(parseInt(e.target.value))} />
            </div>

            <div className="form-row">
              <label htmlFor="random-character">Search random by quote:</label>
              <button className="random-character-btn" type="button" onClick={handleRandomButtonClick}>Click here!</button>
            </div>
          </form>

          <div className="character-container">
            {character && (
              <Card
                name={character.name}
                image={character.image}
                quotes={character.quotes}
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