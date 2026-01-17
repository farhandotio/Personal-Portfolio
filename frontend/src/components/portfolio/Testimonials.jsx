import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Fahim Habib',
    role: 'Founder, Gadget BDs',
    message:
      "We wanted a website that could compete with global tech brands, and Farhan delivered exactly that. The 'Vault' interface he built is incredibly smooth, and our customers constantly compliment how premium the site feels. It’s fast, easy to navigate, and has completely changed how people perceive our products online.",
    rating: 5,
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // For slide direction

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  // Animation Variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <section className="bg-bg min-h-[600px] flex flex-col justify-center items-center py-20 px-4 relative overflow-hidden">
      <SectionHeader title={'Client Results Real Impact.'} size="xl" />

      {/* Content Container */}
      <div className="max-w-4xl -mt-20 md:-mt-30 mx-auto w-full relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="relative min-h-[300px] flex flex-col items-center justify-center w-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="flex flex-col items-center w-full"
              >
                {/* Quote Icon & Message */}
                <div className="relative mb-8 px-4 md:px-0 w-full">
                  <div className="hidden md:block absolute -top-4 left-0 md:-left-12 lg:-left-20 opacity-20">
                    {/* Fixed Primary Color */}
                    <Quote size={80} className="text-primary" strokeWidth={1} />
                  </div>

                  <p className="text-xl md:text-2xl text-zinc-100 font-medium leading-relaxed max-w-3xl mx-auto relative z-10">
                    "{current.message}"
                  </p>
                </div>

                {/* Author Block */}
                <div className="flex flex-col items-center gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <h4 className="text-text font-bold text-lg leading-none mb-1">
                        {current.name}
                      </h4>
                      <p className="text-zinc-400 text-sm">{current.role}</p>
                    </div>
                  </div>

                  {/* Rating Badge (Fixed Primary Color) */}
                  <div className="px-4 py-1.5 rounded-full border text-sm font-bold flex items-center gap-2 bg-primary/10 text-primary border-primary/20">
                    <Star size={14} fill="currentColor" />
                    {current.rating} Rating
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-6 mt-4 z-20">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-zinc-700 text-zinc-400 hover:text-primary hover:border-primary hover:bg-primary/10 transition-all active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`cursor-pointer transition-all duration-300 rounded-full h-2 
                    ${currentIndex === index ? 'w-8 bg-primary' : 'w-2 bg-zinc-700 hover:bg-zinc-600'}
                  `}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-zinc-700 text-zinc-400 hover:text-primary hover:border-primary hover:bg-primary/10 transition-all active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
