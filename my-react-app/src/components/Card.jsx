import React from 'react';
import { data } from './Data'
import './card.css'

export function Card() {
  return (
    <>
    <div className="card-container">
      {data.map((data, index) => (
        <div key={index} className='card'>
      <div className='card-content'>
        <h2 className='card_title'>{data.title}</h2>
        <p className='card-description'>{data.description}</p></div>     
      </div>
      ))}
    </div>
    </>
  );
}

