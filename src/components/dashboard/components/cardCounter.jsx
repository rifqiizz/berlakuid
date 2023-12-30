import React from 'react';

const CardCounter = ({ item, text }) => {
  
  return (
    <div className="card-counter">
      <h6>{text}</h6>
      <h1>{item}</h1>
    </div>
  );
}

export default CardCounter;
