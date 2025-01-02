'use client'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/moving-border'
import { HoverEffect } from './ui/card-hover-effect';


 export const webinars = [
   {
     title: "Mastering Piano Basics",
     description:
       "A comprehensive webinar covering foundational piano techniques and practice tips for beginners.",
      link: "mastering-piano-basics",
   },
   {
     title: "Advanced Guitar Techniques",
     description:
       "An in-depth session on advanced strumming patterns, fingerpicking, and improvisation for guitarists.",
      link: "advanced-guitar-techniques",
   },
   {
     title: "Vocal Training Essentials",
     description:
       "Learn the essentials of vocal warm-ups, breath control, and performance techniques in this engaging webinar.",
      link: "vocal-training-essentials",
   },
   {
     title: "Understanding Music Theory",
     description:
       "Explore the basics of music theory, including scales, chords, and progressions, to improve your musical knowledge.",
      link: "understanding-music-theory",
   },
   {
     title: "Jazz Improvisation Workshop",
     description:
       "A session dedicated to learning the art of improvisation and jazz performance techniques.",
      link: "jazz-improvisation-workshop",
   },
   {
     title: "Building a Music Portfolio",
     description:
       "Discover how to create a professional portfolio to showcase your musical skills and achievements.",
      link: "building-music-portfolio",
   },
 ];
 
function UpcomingWebinars() {
  return (
    <div className="p-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
         <div className="text-center">
            <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">FEATURED WEBINARS</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Enhance Your Musical Journey</p>
         </div>
         <div className="mt-10">
            <HoverEffect
            items={webinars.map(webinar => (
               {
               title: webinar.title,
               description: webinar.description,
               link: webinar.link
               }
            ))}
            />
         </div>
         <div>
            <Link href={"/"}>
               <Button>
                  Check More
               </Button>
            </Link>
         </div>
      </div>
    </div>
  )
}

export default UpcomingWebinars