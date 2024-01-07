import React from 'react';

const CardCounter = ({ item, text,bg }) => {
  const combinedClassName = `card-counter ${bg}`;
  return (
    <div className={combinedClassName}>
     
      <h1>{item}</h1>
      <h6>{text}</h6>
    </div>
  );
}

export default CardCounter;
