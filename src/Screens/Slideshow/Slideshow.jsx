import "./Slideshow.css";
import {
  LandingPageBrandsBanner,
  LandingPageInfoCardBG,
  LandingPageInfoCardBG2,
  LandingPageInfoCardBG3,
  LandingPageInfoCardBG4,
  LandingPageInfoCardBG5,
} from "../../Assets";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import React, { useEffect, useRef, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
const words = [
  "Step inside, for comfort and magic await you.",
  "Where luxury meets comfort",
  "Elevate your space with our sofas",
]; // Example words for Typewriter effect

const pics = [
  LandingPageInfoCardBG4,
  LandingPageInfoCardBG5,
  LandingPageInfoCardBG4,
];

export default function Slideshow() {
  const typewriterRef = useRef(null); // Ref for Typewriter instance

  useEffect(() => {
    if (typewriterRef.current) {
      // Start typing animation when component mounts
      typeWords(0); // Start typing the first word
    }
  }, []);

  const typeWords = (index) => {
    if (typewriterRef.current) {
      const currentWord = words[index];

      // Start typing the current word
      typewriterRef.current
        .typeString(currentWord)
        .pauseFor(2500) // Pause after typing each word
        .deleteAll() // Delete the typed word
        .callFunction(() => {
          // Move to the next word after deletion
          const nextIndex = (index + 1) % words.length;
          typeWords(nextIndex);
        })
        .start();
    }
  };
  return (
    <>
      <div className="landing_page_slideshow_box">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {words.map((word, index) => (
            <SwiperSlide key={index} className="landing_page_swiper_card">
              <div className="landing_page_infocard">
                <img
                  src={pics[index]}
                  alt=""
                  className="landing_page_infocard_bg_img"
                />
                <div className="landing_page_infocard_content">
                  <div className="landing_page_infocard_title">
                    <Typewriter
                      // onInit={(typewriter) => {
                      //   typewriterRef.current = typewriter;
                      //   typewriter
                      //     .changeDeleteSpeed(1)
                      //     .typeString(word.word)
                      //     .pauseFor(2500)
                      //     .start();
                      // }}
                      ref={(typewriter) => (typewriterRef.current = typewriter)}
                      loop
                      cursor
                      words={[word]}
                    />
                  </div>
                  <div className="landing_page_infocard_btn">Shop Now</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
