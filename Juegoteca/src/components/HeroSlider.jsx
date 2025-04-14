// src/components/HeroSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

import '../components_css/HeroSlider.css';

const HeroSlider = () => {
  return (
    <section className="hero-slider">
      <div className="hero-text" id='home'>
        <h1>ARCADE GAMES</h1>
        <p>Diversión sin fronteras, juegos sin límites</p>
      </div>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="swiper-container"
      >
        {/* Kenia Race Gif*/}
        <SwiperSlide>
          <img src="./img_hero/kenia_hero.gif" style={{ width: '100%', height: '100%' }}   alt="Kenia Race" />
        </SwiperSlide>

        {/* Sopadeletras Gif*/}
        <SwiperSlide>
          <img src="./img_hero/sopadeletras.gif"  style={{ width: '100%', height: '100%' }} alt="Juego arcade 2" />
        </SwiperSlide>

        {/* Ateroids Gif */}
        <SwiperSlide>
          <img src="./img_hero/asteroids.gif" style={{ width: '100%', height: '100%' }} alt="Juego arcade 2" />
        </SwiperSlide>

        {/* Tetris Gif */}
        <SwiperSlide>
          <img src="./img_hero/tetris.gif" style={{ width: '100%', height: '100%' }} alt="Juego arcade 2" />
        </SwiperSlide>
      </Swiper>

      <h1 className='ourgames'>NUESTROS JUEGOS</h1>
    </section>
  );
};

export default HeroSlider;
