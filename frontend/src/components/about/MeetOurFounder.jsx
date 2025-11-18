import React from "react";
import { FaLinkedin, FaTwitter, FaGithub, FaRocket } from "react-icons/fa";

const FOUNDER_IMAGE_URL =
  "https://placehold.co/500x500/0f172a/ffffff?text=Farhan+Ahmed";

const MeetOurFounder = () => {
  return (
    <section className="py-30 bg-bg" aria-labelledby="founder-heading">
      <div className="flex flex-col lg:flex-row items-end gap-12">
        <div className="lg:w-3/4 w-full space-y-6">
          <h1
            id="founder-heading"
            className="text-3xl font-extrabold text-text mb-5"
          >
            Meet Our Founder
          </h1>
          {/* Founder Name */}
          <h2 className="text-2xl font-semibold text-primary">
            MD Farhan Sadik
          </h2>

          {/* Bio Paragraph 1 */}
          <p className="text-xl leading-relaxed text-mutedText">
            With over 8 years of experience in digital innovation, Farhan
            founded the agency with a vision to bridge the gap between
            technology and business success. His expertise spans full-stack
            development, UI/UX design, and digital strategy.
          </p>

          {/* Bio Paragraph 2 */}
          <p className="text-xl leading-relaxed text-mutedText">
            Farhan's passion for emerging technologies and user-centric design
            has led to the successful delivery of numerous high-impact projects
            for startups and Fortune 500 companies alike.
          </p>

          {/* Social Media Icons (Using react-icons) */}
          <div className="flex space-x-4 pt-4">
            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn Profile"
              className="text-mutedText hover:text-primary transition duration-300"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>

            {/* Twitter */}
            <a
              href="#"
              aria-label="Twitter Profile"
              className="text-mutedText hover:text-primary transition duration-300"
            >
              <FaTwitter className="w-6 h-6" />
            </a>

            {/* Github */}
            <a
              href="#"
              aria-label="Github Profile"
              className="text-mutedText hover:text-primary transition duration-300"
            >
              <FaGithub className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Image Card (W-full on mobile, 1/3 on desktop) */}
        <div className="lg:w-1/4 w-full relative">
          <div
            className="
                relative w-full aspect-square 
                bg-cardBg rounded-3xl overflow-hidden 
                shadow-2xl border-4 border-border
              "
          >
            {/* Founder Image */}
            <img
              src={
                "https://storage.googleapis.com/uxpilot-auth.appspot.com/8c72e0b481-6e5102fb0a8d68c863aa.png"
              }
              alt="Farhan Ahmed, Founder of Farhan Sadik"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://ik.imagekit.io/farhansadik/Agency/ppp.png?updatedAt=1761999834854";
              }}
            />

            {/* Rocket Icon Overlay */}
            <div
              className="
                  absolute bottom-4 right-4 
                  w-12 h-12 rounded-full 
                  bg-linear-to-br from-secondary to-hoverSecondary 
                  shadow-lg flex items-center justify-center 
                  transform hover:scale-110 transition duration-300
                "
            >
              {/* react-icon Rocket */}
              <FaRocket className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetOurFounder;
