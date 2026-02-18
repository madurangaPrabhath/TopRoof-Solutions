import React, { useState, useEffect, useCallback } from 'react';
import '../assets/styles/Testimonials.css';
import user1 from '../assets/images/female.jpg';
import user2 from '../assets/images/man1.jpg';
import user3 from '../assets/images/man2.jpg';

const testimonials = [
  {
    quote:
      "As a contractor, I save time and money using this site. Everything's in one place, and the service is top-notch.",
    name: 'R.K.S. Amilia',
    location: 'Gampaha',
    role: 'Building Contractor',
    rating: 5,
    image: user1,
    cardStyle: 'white-card',
  },
  {
    quote:
      'TopRoof Solutions made it so easy to find the roofing sheets I needed. Delivered on time and great quality!',
    name: 'T.S.D. Jane',
    location: 'Kandy',
    role: 'Homeowner',
    rating: 5,
    image: user2,
    cardStyle: 'blue-card',
  },
  {
    quote:
      'Hard to find gutters like this anywhere else. Very happy with the purchase. Will definitely order again!',
    name: 'R.K.O. Levis',
    location: 'Piliyandala',
    role: 'Property Developer',
    rating: 5,
    image: user3,
    cardStyle: 'blue-card',
  },
  {
    quote:
      'The roofing tiles we ordered were perfect. Excellent quality materials and the customer support team was very helpful throughout.',
    name: 'D.M. Perera',
    location: 'Colombo',
    role: 'Architect',
    rating: 5,
    image: user2,
    cardStyle: 'white-card',
  },
  {
    quote:
      'We renovated our entire roof using TopRoof products. The pricing was competitive and delivery was faster than expected.',
    name: 'S.L. Fernando',
    location: 'Negombo',
    role: 'Homeowner',
    rating: 4,
    image: user1,
    cardStyle: 'blue-card',
  },
  {
    quote:
      'Best roofing supplier in Sri Lanka! Their range of accessories saved us multiple trips. Highly recommended for any project.',
    name: 'K.P. Wijeratne',
    location: 'Kurunegala',
    role: 'Construction Manager',
    rating: 5,
    image: user3,
    cardStyle: 'white-card',
  },
  {
    quote:
      'I was impressed by the product variety and the easy ordering process. The cement sheets were exactly what I needed for my warehouse.',
    name: 'N.A. Jayasinghe',
    location: 'Matara',
    role: 'Business Owner',
    rating: 5,
    image: user2,
    cardStyle: 'blue-card',
  },
  {
    quote:
      'Professional service from start to finish. The team helped me choose the right roofing solution for our humid climate. Excellent!',
    name: 'M.R. Silva',
    location: 'Galle',
    role: 'Civil Engineer',
    rating: 5,
    image: user1,
    cardStyle: 'white-card',
  },
  {
    quote:
      'We use TopRoof Solutions for all our commercial projects. Consistent quality, fair prices, and reliable delivery every time.',
    name: 'A.B. Dissanayake',
    location: 'Anuradhapura',
    role: 'Contractor',
    rating: 4,
    image: user3,
    cardStyle: 'blue-card',
  },
];

const CARDS_PER_SLIDE_DESKTOP = 3;
const AUTO_SLIDE_INTERVAL = 5000;

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(CARDS_PER_SLIDE_DESKTOP);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalSlides = Math.ceil(testimonials.length / slidesPerView);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesPerView(1);
      } else if (window.innerWidth <= 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCurrentSlide(0);
  }, [slidesPerView]);

  const goToSlide = useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning]
  );

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide >= totalSlides - 1 ? 0 : currentSlide + 1);
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide <= 0 ? totalSlides - 1 : currentSlide - 1);
  }, [currentSlide, totalSlides, goToSlide]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  const startIndex = currentSlide * slidesPerView;
  const visibleTestimonials = testimonials.slice(
    startIndex,
    startIndex + slidesPerView
  );

  return (
    <section
      className="testimonials-section"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <h2 className="testimonial-title">
        What Our Clients Say <span className="underline"></span>
      </h2>
      <p className="testimonial-subtitle">
        Trusted by homeowners, contractors, and builders across Sri Lanka
      </p>

      <div className="testimonial-slider">
        <button
          className="slider-arrow slider-arrow-left"
          onClick={prevSlide}
          aria-label="Previous testimonials"
        >
          ‹
        </button>

        <div className="testimonial-track">
          <div className="testimonial-cards">
            {visibleTestimonials.map((t, index) => (
              <div
                className={`testimonial-card ${t.cardStyle} slide-in`}
                key={startIndex + index}
              >
                <div className="quote-icon">❝</div>
                <div className="star-rating">{renderStars(t.rating)}</div>
                <p className="quote">{t.quote}</p>
                <div className="testimonial-footer">
                  <img src={t.image} alt={t.name} />
                  <div>
                    <h4>{t.name}</h4>
                    <p className="client-role">{t.role}</p>
                    <p className="client-location">📍 {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="slider-arrow slider-arrow-right"
          onClick={nextSlide}
          aria-label="Next testimonials"
        >
          ›
        </button>
      </div>

      <div className="dot-indicators">
        {Array.from({ length: totalSlides }, (_, i) => (
          <span
            key={i}
            className={`dot ${i === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(i)}
          ></span>
        ))}
      </div>

      <div className="testimonial-counter">
        {currentSlide + 1} / {totalSlides}
      </div>
    </section>
  );
};

export default Testimonials;
