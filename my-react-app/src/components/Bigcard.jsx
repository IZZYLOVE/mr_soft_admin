import React from 'react';
import { Bigdata } from './Bigdata'
import './bigcard.css'

export function Bigcard() {
  return (
    <>
    <div className="card-container">
      {Bigdata.map((Bigdata, index) => (
        <div key={index} className='bigcard'>
      <div className='bigcard-content'>
        <h2 className='bigcard_title'>{Bigdata.title}</h2>
        <p className='bigcard-description'>{Bigdata.description}</p></div>     
      </div>
      ))}
    </div>
    </>
  );
}
