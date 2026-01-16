import React, { useEffect, useRef } from 'react';
import PrimaryButton from '../common/PrimaryButton';
import { gsap } from 'gsap';

const HeroSection = () => {
  const heroRef = useRef(null);
  const h1Ref = useRef(null);
  const pRef = useRef(null);
  const btnRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [h1Ref.current, pRef.current, btnRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power2.out',
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 0.2,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-between"
      aria-label="MD Farhan Sadik Hero Section"
    >
      <div className="mx-auto container px-5 sm:px-7 lg:px-10 pt-30 max-md:pb-15 md:pt-15">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-8/12 text-center lg:text-left">
            {/* Role Badge */}
            <div className="inline-block mb-6 px-4 py-1.5 text-sm rounded-full border border-white/15 text-mutedText">
              MERN Stack • Full-Stack Developer
            </div>

            <h1 ref={h1Ref} className="text-4xl md:text-5xl xl:text-5xl font-bold leading-tight">
              <span className="">Hi, I’m </span> <br className='md:hidden' /> <span className="text-white">MD Farhan Sadik</span>
              <br />
              <span className="text-primary">I build scalable web products</span>
            </h1>

            <p
              ref={pRef}
              className="mt-6 text-lg md:text-xl text-mutedText max-w-xl mx-auto lg:mx-0"
            >
              I help startups and growing businesses design and develop fast, reliable, and scalable
              web applications using modern JavaScript and the MERN stack.
            </p>

            <div
              ref={btnRef}
              className="mt-10 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
            >
              <div className="">
                <PrimaryButton
                  text="View Projects"
                  href="#projects"
                  size="lg"
                  className="rounded-full"
                />
              </div>
              <div className="">
                <PrimaryButton
                  text="Download Resume"
                  href="/resume/Resume.pdf"
                  size="lg"
                  bgColor="bg-secondary"
                  className="rounded-full"
                />
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Offset background frame */}
              <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl border border-white/10" />

              <div
                ref={imageRef}
                className="relative w-[260px] sm:w-[320px] md:w-[360px] aspect-square rounded-3xl overflow-hidden bg-neutral-900"
              >
                <img
                  src="https://ik.imagekit.io/farhansadik/Agency/ppp.png?updatedAt=1761999834854"
                  alt="MD Farhan Sadik"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);
