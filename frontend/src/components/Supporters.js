import React from 'react';
import '../assets/styles/Supporters.css';

import elToro from '../assets/images/el-toro.png';
import rhino from '../assets/images/rhino.png';
import supermet from '../assets/images/supermet.png';
import colorup from '../assets/images/colorup.png';

const logos = [
  { src: elToro, alt: 'El Toro' },
  { src: rhino, alt: 'Rhino' },
  { src: supermet, alt: 'Supermet' },
  { src: colorup, alt: 'Colorup' },
];

const Supporters = () => {
  // Duplicate the list to create a seamless loop
  const track = [...logos, ...logos, ...logos];

  return (
    <section className="supporters-section">
      <h2 className="supporters-title">
        Our Supporters <span className="underline"></span>
      </h2>
      <div className="supporters-marquee-wrapper">
        <div className="supporters-marquee-track">
          {track.map((logo, i) => (
            <div className="supporters-logo-item" key={i}>
              <img src={logo.src} alt={logo.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Supporters;
