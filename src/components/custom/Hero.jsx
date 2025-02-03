import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-auto max-w-5xl px-4 gap-6 md:gap-9 text-center'>
      <h2 className='font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-12 md:mt-16 leading-tight'>
        <span className='text-[#f56551]'>Discover your next adventure: </span> 
        personalized Itineraries at your fingertips
      </h2>

      <p className='text-lg sm:text-xl text-gray-500 max-w-3xl'>
        Your Personal trip Planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>

      <Link to="/create-trip">
        <Button className="px-6 py-3 text-lg">Get Started, It's Free</Button>
      </Link>

      <img 
        src='/placeholder.jpg' 
        className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl object-cover -mt-10 sm:-mt-3' 
        alt="Hero Image" 
      />
      <img 
        src='/placeholder1.jpg' 
        className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl object-cover -mt-10 sm:-mt-3' 
        alt="Hero Image" 
      />
      <img 
        src='/placeholder2.jpg' 
        className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl object-cover -mt-10 sm:-mt-3' 
        alt="Hero Image" 
      />
      <img 
        src='/placeholder3.jpg' 
        className='w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl object-cover -mt-10 sm:-mt-3' 
        alt="Hero Image" 
      />
    </div>
  );
}

export default Hero;
