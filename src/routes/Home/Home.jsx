import React, { Component } from 'react';
import './Home.css'
import Carrusel from '../../components/Carousel/Carousel';
import Trailers from '../../components/Trailers/Trailers';
import Listings from '../../components/Listings/Listings';
import Filter from '../../components/Filter/Filter'

const Home = () => {
  

  return (
    <>
      <div className='main-container'>
        <div className='containerp'>
          
          <div className='carrusel'>
            <Carrusel/>
          </div>

          <div className='next'>
            <h2>Próximos estrenos</h2>
            <Trailers/>
          </div>
        </div>
         <h2>En cartelera</h2>
        <div className='filter'>
          <Filter/>
        </div>
        
        <div className='list'>
          <Listings/>
        </div>
      </div>
    </>
  );
};

export default Home;