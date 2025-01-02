import React from 'react'
import { InfiniteMovingCards } from './ui/infinite-moving-cards'

const testimonials = [
   {
     quote:
       "Joining this music school was the best decision I ever made. The instructors are not only talented but also very supportive and patient.",
     name: "Sarah Johnson",
     title: "Piano Student",
   },
   {
     quote:
       "The guitar lessons here transformed the way I play. The hands-on guidance and practice routines were incredibly effective.",
     name: "James Wilson",
     title: "Guitar Student",
   },
   {
     quote:
       "I always dreamed of singing professionally, and this school has brought me closer to that dream. The vocal training is top-notch.",
     name: "Emily Brown",
     title: "Vocal Student",
   },
   {
     quote:
       "As a beginner, I was nervous to start learning the violin, but the welcoming environment and expert teachers made it easy to progress.",
     name: "Michael Davis",
     title: "Violin Student",
   },
   {
     quote:
       "The passion and dedication of the staff are evident in every class. I can't recommend this school enough for aspiring musicians.",
     name: "Laura White",
     title: "Music Theory Student",
   },
 ];
 
function MusicSchoolTestimonailCards() {
  return (
    <div className="h-[40rem] w-full dark:bg-black dark:bg-grid-white/[0.2] relative flex flex-col items-center justify-center overflow-hidden">
    <h2 className="text-4xl font-bold text-center mb-8 z-10">Hear our Harmony: Voices of success</h2>
    <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
    </div>
</div>
  )
}

export default MusicSchoolTestimonailCards