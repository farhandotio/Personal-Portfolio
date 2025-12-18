import React, { useEffect, useRef } from 'react';
import PrimaryButton from '../common/PrimaryButton';
import { gsap } from 'gsap';

const HeroSection = () => {
  const heroRef = useRef(null);
  const h1TextRef = useRef(null);
  const pTextRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const h1Spans = Array.from(h1TextRef.current.querySelectorAll('span'));
      const pText = pTextRef.current;
      const button = buttonRef.current;

      /* ---------------- INITIAL STATE (GSAP.SET) ---------------- */
      gsap.set(h1Spans, {
        opacity: 0,
        x: (i) => (i % 2 === 0 ? -80 : 80),
      });

      gsap.set([pText, button], {
        opacity: 0,
        y: 30,
      });

      const appearTl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          duration: 1,
        },
      });

      appearTl
        .to(h1Spans, {
          opacity: 1,
          x: 0,
          stagger: 0.15,
        })
        .to(
          [pText, button],
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
          },
          '-=0.6'
        );

      /* ---------------- SCROLL ANIMATION REMOVED ---------------- */
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[650px] pt-15 flex items-center"
      aria-label="MD Farhan Sadik Portfolio"
      role="region"
    >
      {/* Background Lighting */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow delay-1000"></div>
      </div>

      <div className="relative z-10 p-5 sm:p-7 lg:p-10 flex flex-col items-center w-full">
        <div className="mb-12 lg:mb-0 justify-center text-center mx-auto py-5">
          <h1 ref={h1TextRef} className="text-4xl md:text-6xl font-extrabold leading-tight">
            <span className="relative inline-block will-change-transform text-white text-shadow-lg-white">
              <span className="absolute -top-3 -left-11 md:-left-13 -rotate-30 bg-cardBg rounded-full text-base px-5 font-panda">
                hi, i'm
              </span>
              MD Farhan Sadik
            </span>
            <br />
            <span className="block pt-2 text-primary will-change-transform text-shadow-lg-cyan">
              — Full Stack,
            </span>
            <span className="max-lg:block text-secondary inline-block will-change-transform text-shadow-lg-fuchsia">
              Web Developer focused on
            </span>
            <span className="max-lg:block inline-block will-change-transform text-white text-shadow-lg-white">
              Scalable & High-Performance Web Apps
            </span>
          </h1>

          <p
            ref={pTextRef}
            className="mt-6 text-lg md:text-2xl leading-relaxed text-mutedText will-change-transform"
          >
            I help startups, founders, and growing businesses turn ideas into fast, scalable, and
            user-focused web applications using modern JavaScript and the MERN stack.
          </p>

          <div
            ref={buttonRef}
            className="md:mt-8 mt-5 inline-flex max-md:flex max-md:flex-col gap-5 will-change-transform"
          >
            <PrimaryButton
              text="View My Work"
              href="#projects"
              size="lg"
              className="rounded-full"
            />
            <PrimaryButton
              text="Download Resume"
              href="/resume/Resume.pdf"
              size="lg"
              bgColor={'bg-secondary'}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);
