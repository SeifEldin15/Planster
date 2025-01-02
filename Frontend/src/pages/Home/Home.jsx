import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import HeroSection from '../../components/HeroSection/HeroSection'
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import FAQ from '../../components/FAQ/FAQ'
import Footer from '../../components/Footer/Footer'
import EventBookingSection from '../../components/EventBookingSection/EventBookingSection'
import EventVendors from '../../components/EventVendors/EventVendors'
import BusinessesSlider from '../../components/BusinessesSlider/BusinessesSlider'
const Home = () => {
  useEffect(() => {
    const checkAndCreateGuestToken = async () => {
      const token = localStorage.getItem('token');
      console.log('Existing token:', token);
      
      if (!token) {
        try {
          const response = await fetch('https://planster.com.au:5000/api/auth/guest', {
            method: 'POST',
            credentials: 'include',
          });
          
          const data = await response.json();
          console.log('Response data:', data);
          if (data.guestId) {
            localStorage.setItem('token', data.token);
            console.log('New token saved:', data.token);
          }
        } catch (error) {
          console.error('Error creating guest token:', error);
        }
      }
    };

    checkAndCreateGuestToken();
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSection />
      {/* <BusinessesSlider /> */}
      <HowItWorks />
      <FAQ />
      <EventBookingSection />
      <EventVendors />
      <Footer />
    </div>
  )
}

export default Home
