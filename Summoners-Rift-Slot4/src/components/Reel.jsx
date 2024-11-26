
import React from 'react';

const Reel = ({ symbol }) => (
  <div style={{ width: '90px', height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <img src={symbol} alt="symbol" style={{ width: '100%', height: '100%' }} />
  </div>
);

export default Reel;

