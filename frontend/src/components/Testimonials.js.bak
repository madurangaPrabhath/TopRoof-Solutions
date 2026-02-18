import React from 'react';
import '../assets/styles/Testimonials.css';
import user1 from '../assets/images/female.jpg';
import user2 from '../assets/images/man1.jpg';
import user3 from '../assets/images/man2.jpg';

const testimonials = [
  {
    quote:
      "As a contractor, I save time and money using this site. Everything’s in one place, and the service is top-notch.",
    name: 'R.K.S. Amilia',
    location: 'Gampaha',
    image: user1,
    cardStyle: 'white-card',
  },
  {
    quote:
      'TopRoof Solutions made it so easy to find the roofing sheets I needed. Delivered on time and great quality!',
    name: 'T.S.D. Jane',
    location: 'Kandy',
    image: user2,
    cardStyle: 'blue-card',
  },
  {
    quote:
      'Hard to find gutters like this anywhere else. Very happy with the purchase. Delivered on time and great quality!',
    name: 'R.K.O. Levis',
    location: 'Piliyandala',
    image: user3,
    cardStyle: 'blue-card',
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <h2 className="testimonial-title">
        What Our Clients Says <span className="underline"></span>
      </h2>
      <div className="testimonial-cards">
        {testimonials.map((t, index) => (
          <div className={`testimonial-card ${t.cardStyle}`} key={index}>
            <div className="quote-icon">❝</div>
            <p className="quote">{t.quote}</p>
            <div className="testimonial-footer">
              <img src={t.image} alt={t.name} />
              <div>
                <h4>{t.name}</h4>
                <p>{t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="dot-indicators">
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </section>
  );
};

export default Testimonials;
