import React from 'react';
import HeroSection from '../components/HeroSection';
import RoofingProducts from '../components/RoofingProducts';
import TopSellingProducts from '../components/TopSellingProducts';
import AboutUs from '../components/AboutUs';
import AccessoriesProducts from '../components/AccessoriesProducts';
import Showrooms from '../components/Showrooms';
import Testimonials from '../components/Testimonials';
import Supporters from '../components/Supporters';
import NewsletterSection from '../components/NewsletterSection';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <RoofingProducts />
      <TopSellingProducts />
      <AboutUs />
      <AccessoriesProducts />
      <Showrooms />
      <Testimonials />
      <Supporters />
      <NewsletterSection />
    </div>
  );
};

export default Home;