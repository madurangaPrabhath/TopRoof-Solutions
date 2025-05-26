import React from 'react';

const Testimonials = () => {
  const testimonials = [
    { id: 1, quote: "Great quality products!", author: "John D." },
    { id: 2, quote: "Excellent customer service.", author: "Sarah M." }
  ];

  return (
    <section className="testimonials">
      <h2>What Our Clients Say</h2>
      <div className="testimonial-grid">
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className="testimonial-card">
            <p>"{testimonial.quote}"</p>
            <p>- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;