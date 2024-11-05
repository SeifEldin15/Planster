import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import HeroSection from '../../components/HeroSection/HeroSection'
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import FAQ from '../../components/FAQ/FAQ'
import Footer from '../../components/Footer/Footer'
import EventBookingSection from '../../components/EventBookingSection/EventBookingSection'
const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FAQ />
      <EventBookingSection />
      <Footer />
    </div>
  )
}

export default Home
