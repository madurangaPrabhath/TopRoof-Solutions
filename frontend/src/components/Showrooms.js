import React from 'react';
import '../assets/styles/Showrooms.css';

const showrooms = [
  {
    name: 'Wennappuwa',
    address: 'Vandalan Building, Kolinjadiya, Wennappuwa.',
    tel: ['0312 254 802', '0763 090 908'],
    email: 'sh.wennappuwa@roofing.lk',
    theme: 'light',
  },
  {
    name: 'Kadawatha',
    address: 'No. 585/3A, Eldeniya, Kadawatha.',
    tel: ['0112 928 743', '0773 642 939'],
    email: 'info.@roofing.lk',
    theme: 'highlight',
  },
  {
    name: 'Nawala',
    address: 'No. 209, Nawala Road, Nawala',
    tel: ['0112 086201', '0774 772 939'],
    email: 'info@nawalaroofing.lk',
    theme: 'light',
  },
];

const Showrooms = () => {
  return (
    <section className="showrooms-section">
      <h2 className="section-title">
        Showrooms <span className="underline"></span>
      </h2>
      <div className="showrooms-grid">
        {showrooms.map((room, index) => (
          <div
            key={index}
            className={`showroom-card ${
              room.theme === 'highlight' ? 'highlight-card' : 'light-card'
            }`}
          >
            <h3 className={room.theme === 'highlight' ? 'highlight-title' : ''}>
              {room.name}
            </h3>
            <p className={room.theme === 'highlight' ? 'highlight-text' : ''}>
              <i className="fas fa-map-marker-alt"></i> {room.address}
            </p>
            {room.tel.map((number, i) => (
              <p
                key={i}
                className={room.theme === 'highlight' ? 'highlight-text' : ''}
              >
                <i className="fas fa-phone-alt"></i> {number}
              </p>
            ))}
            <p className={room.theme === 'highlight' ? 'highlight-text' : ''}>
              <i className="fas fa-envelope"></i>{' '}
              <a href={`mailto:${room.email}`}>{room.email}</a>
            </p>
            <button className="contact-button">Contact</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Showrooms;
