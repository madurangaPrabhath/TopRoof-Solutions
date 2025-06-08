import React from 'react';
import '../assets/styles/Supporters.css';

import elToro from '../assets/images/el-toro.png';
import rhino from '../assets/images/rhino.png';
import supermet from '../assets/images/supermet.png';
import colorup from '../assets/images/colorup.png';

const Supporters = () => {
  return (
    <section className="supporters-section">
      <h2 className="supporters-title">
        Our Supporters <span className="underline"></span>
      </h2>
      <div className="supporters-logos">
        <img src={elToro} alt="El Toro" />
        <img src={rhino} alt="Rhino" />
        <img src={supermet} alt="Supermet" />
        <img src={colorup} alt="Colorup" />
      </div>
    </section>
  );
};

export default Supporters;
