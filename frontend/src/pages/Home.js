import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import RoofingProducts from '../components/RoofingProducts';
import TopSellingProducts from '../components/TopSellingProducts';
import AboutUs from '../components/AboutUs';
import AccessoriesProducts from '../components/AccessoriesProducts';
import Showrooms from '../components/Showrooms';
import Testimonials from '../components/Testimonials';
import Supporters from '../components/Supporters';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <RoofingProducts />
      <TopSellingProducts />
      <section id="about">
        <AboutUs />
      </section>
      <AccessoriesProducts />
      <Showrooms />
      <Testimonials />
      <Supporters />
      <NewsletterSection />
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default Home;