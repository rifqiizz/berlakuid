import React from 'react';

const CardCounter = ({ item, text }) => {
  
  return (
    <div className="card-counter">
     
      <h1>{item}</h1>
      <h6>{text}</h6>
    </div>
  );
}

export default CardCounter;
