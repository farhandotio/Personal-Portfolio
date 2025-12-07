import React from "react";
import { Link } from "react-router-dom";
import { IoArrowDown } from "react-icons/io5";
import ReviewStar from "../common/ReviewStar";
import SectionHeader from "../common/SectionHeader";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Founder, TechVerse",
    image:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
    message:
      "Farhan transformed our outdated website into a modern, high-performing platform. The attention to detail and smooth animations were exceptional!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Ahmed",
    role: "Marketing Head, PureDrop",
    image:
      "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    message:
      "Farhan understood our brand perfectly. The dark-themed design with interactive 3D bottle made PureDrop stand out. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Mohammed Rafi",
    role: "CEO, DripNest",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    message:
      "Working with Farhan was smooth and professional. Every section felt intentional and visually striking.",
    rating: 4.8,
  },
];

const Testimonials = () => {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="pt-15 pb-20 lg:pb-30 p-5 md:p-7 lg:p-10 bg-bg text-text"
    >
      <div>
        <SectionHeader
          title="What clients say about me"
          description="Genuine feedback from clients and founders who trusted me to craft
            their product websites and digital experiences."
          size="lg"
        />

        {/* Grid: 1 col mobile, 2 md, 3 lg */}
        <div className="flex gap-5 flex-nowrap overflow-x-auto hidden-scrollbar">
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="relative group shrink-0 bg-cardBg border border-border p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex max-md:flex-col items-start gap-4">
                <img
                  src={t.image}
                  alt={`${t.name} avatar`}
                  loading="lazy"
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-[rgba(255,255,255,0.04)]"
                />

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold leading-none">
                        {t.name}
                      </h3>
                      <p className="text-xs md:text-sm text-mutedText">
                        {t.role}
                      </p>
                    </div>

                    <div className="flex flex-col items-end max-md:hidden">
                      <ReviewStar value={t.rating} label={t.name} />
                    </div>
                  </div>
                  <div className="flex flex-col md:hidden">
                    <ReviewStar value={t.rating} label={t.name} />
                  </div>

                  <p className="mt-4 text-mutedText max-w-50 md:max-w-sm text-sm leading-relaxed">
                    {t.message}
                  </p>
                </div>
              </div>

              {/* Decorative quote mark */}
              <svg
                className="absolute right-4 bottom-4 w-10 h-10 text-[rgba(255,255,255,0.04)]"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9.5 7a3.5 3.5 0 00-3.5 3.5V14H12V10.5A3.5 3.5 0 009.5 7zm8 0a3.5 3.5 0 00-3.5 3.5V14H20V10.5A3.5 3.5 0 0017.5 7z" />
              </svg>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
