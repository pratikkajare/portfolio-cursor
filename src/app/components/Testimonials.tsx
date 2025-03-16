'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Alex Johnson",
      role: "CTO",
      company: "TechSolutions Inc.",
      content: "Pratik is an exceptional developer with deep knowledge of backend technologies. His work with NestJS and GraphQL helped us scale our platform efficiently. His code is clean, well-documented, and follows best practices.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Sarah Williams",
      role: "Product Manager",
      company: "InnovateTech",
      content: "Working with Pratik was a great experience. He quickly understood our requirements and delivered a robust backend solution that exceeded our expectations. His communication skills and attention to detail are outstanding.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      company: "DataFlow Systems",
      content: "Pratik's expertise in MongoDB and database optimization was crucial for our project. He implemented efficient data structures and query patterns that significantly improved our application's performance.",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="py-10">
      <h3 className="text-2xl font-bold mb-12 text-center">What People Say</h3>

      <div className="relative max-w-3xl mx-auto px-4">
        {/* Testimonial Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full flex-shrink-0 px-4"
              >
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="relative h-14 w-14 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <svg
                      className="absolute -top-4 -left-4 h-8 w-8 text-green-500 opacity-20"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>

                    <p className="text-gray-600 dark:text-gray-300 italic relative z-10">
                      {testimonial.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)}
          className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Previous testimonial"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)}
          className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Next testimonial"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}