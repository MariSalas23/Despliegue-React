import simpsonTitle from './assets/simpson-tittle.jpg';
import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card/Card';

function App() {
  const [character, setCharacter] = useState(null);

  // Personaje aleatorio para buscar por nombre y número de frases.
  const randomCharacter = () => {
    const characters = ['homer', 'bart', 'ralph', 'moe']; // Personajes con al menos 3 frases de la API.
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  };

  // Función asíncrona para buscar personaje por nombre y número de frases.
  const searchCharacterCont = async (count) => {
    try {
      const randomCharacterName = randomCharacter();
      const response = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${encodeURIComponent(randomCharacterName)}&count=${count}`);
      const data = await response.json();
      doCharacter(data);
    } catch (error) {
      messageApiError(error);
    }
  };

  // Función asíncrona para buscar personaje por el nombre.
  const searchCharacter = async (characterName) => {
    try {
      const response = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${encodeURIComponent(characterName)}`);
      const data = await response.json();
      doCharacter(data);
    } catch (error) {
      messageApiError(error);
    }
  };

  // Función asíncrona para buscar personaje por frase.
  const searchByPhrase = async () => {
    try {
      const response = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
      const data = await response.json();
      doCharacter(data);
    } catch (error) {
      messageApiError(error);
    }
  };

  // Función con la información del personaje.
  const doCharacter = (data) => {
    if (data.length > 0) {
      const randomQuote = data[0];
      setCharacter({
        name: randomQuote.character,
        image: randomQuote.image,
        quotes: data.map(quote => quote.quote)
      });
    } else {
      setCharacter(null);
      alert('No quotes found.');
    }
  };

  // Mensaje de error de la API al buscar los datos.
  const messageApiError = (error) => {
    console.error('API Error:', error);
    alert('An error occurred. Please try again later.');
  };


  // Función asíncrona para manejar los enters (evento) del input.
  const handleKeyPress = async (e) => {
    if (e.key === 'Enter' && e.target.classList.contains('character')) {
      searchCharacter(e.target.value); 
    } else if (e.key === 'Enter' && e.target.classList.contains('cont')) {
      const inputCount = parseInt(e.target.value);
      if (inputCount >= 1 && inputCount <= 3) { // Condicional para que solo se pueda ingresar entre 1 y 3.
        searchCharacterCont(inputCount);
      } else {
        alert('Please enter a number between 1 and 3.');
      }
    }
  };

  // Función para que al dar click al botón, se busque el personaje.
  const handleRandomButtonClick = () => {
    searchByPhrase();
  };

  // Muestra un personaje aleatorio cuando se carga la página.
  useEffect(() => {
    searchCharacter(randomCharacter());
  }, []);

  // "HTML"
  return (
    <div className="container">
      <div className="header">
      <img src={simpsonTitle} alt="Título Simpsons" />
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
                <input type="number" min="1" max="3" className="cont" placeholder="Enter a number" onKeyPress={handleKeyPress} />
            </div>

            <div className="form-row">
              <label htmlFor="random-character">Search random (quote):</label>
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
