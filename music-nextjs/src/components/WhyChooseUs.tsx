'use client'
import React from 'react'
import { StickyScroll } from './ui/sticky-scroll-reveal';

const musicSchoolContent = [
   {
     title: "Learn to Play Instruments",
     description:(
      <div><p className='text-lg'>Master the art of playing your favorite instruments with step-by-step guidance from experts. From guitars to pianos and beyond, our academy provides tailored lessons for all skill levels. Start your musical journey today and bring your melodies to life.</p></div>
     ),
     content: (
       <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--blue-500),var(--brown-500))] flex items-center justify-center text-white">
         Learn to Play Instruments
       </div>
     ),
   },
   {
     title: "Music Theory Simplified",
     description:(
      <div><p className='text-lg'>Dive deep into the language of music. Understand scales, chords, and harmony with ease. Whether you were a beginner or looking to sharpen your knowledge, our music theory courses will make complex concepts accessible and engaging.</p></div>
     ),
     content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--green-500),var(--yellow-500))] flex items-center justify-center text-white">
         Music Theory Simplified
       </div>
     ),
   },
   {
     title: "Songwriting and Composition",
     description:(
      <div><p className='text-lg'>Unleash your creativity with our songwriting and composition classes. Learn how to craft lyrics, compose melodies, and create music that resonates with your audience. Develop your unique style and turn your ideas into reality.</p></div>
     ),
     content: (
       <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--yellow-500),var(--blue-500))] flex items-center justify-center text-white">
         Songwriting and Composition
       </div>
     ),
   },
   {
     title: "Live Performance Skills",
     description:(
      <div><p className='text-lg'>Gain confidence and learn to captivate your audience with live performance techniques. From stage presence to managing stage fright, our courses will prepare you for the spotlight and help you shine as a performer.</p></div>
     ),
     content: (
       <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--red-500),var(--green-500))] flex items-center justify-center text-white">
         Live Performance Skills
       </div>
     ),
   },
   {
     title: "Music Production and Recording",
     description:(
      <div><p className='text-lg'>Step into the world of music production. Learn how to record, edit, and produce high-quality tracks using industry-standard software and equipment. Whether you were producing beats or recording vocals, our academy has you covered.</p></div>
     ),
     content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--purple-500),var(--black-500))] flex items-center justify-center text-white">
         Music Production and Recording
      </div>
     ),
   },
 ]; 
 
function WhyChooseUs() {
  return (
    <div>
      <StickyScroll content={musicSchoolContent} />
    </div>
  )
}

export default WhyChooseUs