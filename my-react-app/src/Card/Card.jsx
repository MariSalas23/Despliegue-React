import React from 'react';

function Card({ name, image, quote }) {
    return (
      <div className="card">
        <div className="image-container-character">
           <img src={image} alt="Character" /> 
        </div>
        
        <div className="text-container-character">
          <h2>Character:</h2>
          <p>{name}</p>
          <h2>Quote:</h2>
          <p>{quote}</p>
        </div>
      </div>
    );
  }
  
  export default Card;