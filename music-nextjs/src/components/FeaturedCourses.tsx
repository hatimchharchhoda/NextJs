'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from './ui/moving-border'
import { BackgroundGradient } from './ui/background-gradient'
import courseData from "../data/music_courses.json"

interface Course{
   id: number,
   title: string,
   slug: string,
   description: string,
   price: number,
   instructor: string,
   isFeatured: boolean,
}

function FeaturedCourses() {
   const featuredCourses = courseData.courses.filter((course) => (course.isFeatured))

  return (
    <div className="py-12 bg-gray-900">
      <div className="text-center">
         <h1 className="text-base text-teal-600 font-semibold tracking-wide uppercase">Featured Courses</h1>
         <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Learn With the Best</p>
      </div>

      <div className='mt-10'>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {featuredCourses.map((course:Course) => (
               <div key={course.id} className='flex justify-center'>
                  <BackgroundGradient className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-sm">
                     <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
                        <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">{course.title}</p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow">{course.description}</p>
                        <p className="text-lg sm:text-l text-black mt-4 mb-2 dark:text-neutral-200">Instructor: {course.instructor}</p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow">Price: ${course.price}</p>
                        <Link href={`/courses/${course.slug}`} className='border-spacing-1 bg-blue-950 px-3 py-2 text-blue-450 rounded-full text-sm'>
                           Learn More
                        </Link>
                     </div>
                  </BackgroundGradient>
               </div>
            ))}
         </div>
      </div>
      <div className="mt-20 text-center">
         <Link href={"/courses"}>
            <Button>
               View All Courses
            </Button>
         </Link>
      </div>
    </div>
  )
}

export default FeaturedCourses