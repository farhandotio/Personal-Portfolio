import React, { useState } from "react";
import SectionHeader from "../common/SectionHeader";

// Steps for your development process
const steps = [
  {
    id: 1,
    shortTitle: "SRS",
    longTitle: "Requirements & Planning",
    description:
      "I gather project goals, define scope, and outline technical requirements. Then I create a clear Software Requirements Specification (SRS) including architecture overview, feature specs, and database design.",
  },
  {
    id: 2,
    shortTitle: "Wireframe",
    longTitle: "Low-Fidelity Wireframes",
    description:
      "I design structural wireframes (Figma/Sketch) to show layout, navigation, and user flow. This validates the structure and ensures a smooth user experience.",
  },
  {
    id: 3,
    shortTitle: "Prototype",
    longTitle: "Interactive Prototype",
    description:
      "I build high-fidelity, clickable prototypes with interactions and animations, allowing for usability testing and design feedback before development.",
  },
  {
    id: 4,
    shortTitle: "MVP Plan",
    longTitle: "MVP Development Plan",
    description:
      "I define core features, prioritize tasks, and create a development timeline to launch a Minimum Viable Product efficiently and effectively.",
  },
  {
    id: 5,
    shortTitle: "User Flow",
    longTitle: "User Flow Mapping",
    description:
      "I map out detailed user journeys, decision points, and edge cases to optimize the overall UX flow and ensure intuitive navigation.",
  },
  {
    id: 6,
    shortTitle: "API Doc",
    longTitle: "API Documentation",
    description:
      "I provide complete API documentation, covering endpoints, data structures, authentication, and examples for developers and integrations.",
  },
  {
    id: 7,
    shortTitle: "Delivery",
    longTitle: "Code Delivery & Support",
    description:
      "I deliver the source code, deployment instructions, and documentation. I also provide post-launch support to ensure smooth operation and future scalability.",
  },
];

const HowToWork = () => {
  const [openStep, setOpenStep] = useState(null);

  const toggleStep = (id) => {
    setOpenStep(openStep === id ? null : id);
  };

  return (
    <section className="py-20 md:py-32 bg-bg" aria-labelledby="process-heading">
      <div className="mx-auto px-5 sm:px-7 lg:px-10">
        {/* Main Heading and Description */}
        <SectionHeader
          title="How I Work"
          description="I follow a transparent and structured development process, from planning to delivery, to ensure every project meets quality standards."
          size="lg"
        />

        {/* Accordion Process List */}
        <div className="divide-y divide-border">
          {steps.map((step) => {
            const isOpen = openStep === step.id;

            return (
              <div key={step.id}>
                <button
                  className="w-full text-left py-8 md:py-10 flex justify-between items-start cursor-pointer hover:bg-hoverCardBg focus:outline-none hover:px-5 transition-all duration-300"
                  onClick={() => toggleStep(step.id)}
                  aria-expanded={isOpen}
                  aria-controls={`step-content-${step.id}`}
                  aria-labelledby={`step-title-${step.id}`}
                  title={`Toggle details for ${step.longTitle}`}
                >
                  <div className="flex-1 items-center">
                    <h3
                      id={`step-title-${step.id}`}
                      className="text-lg sm:text-3xl font-bold text-text tracking-wide"
                    >
                      {`${step.id}. ${step.longTitle}`}
                    </h3>
                  </div>

                  <div className="md:p-1">
                    <svg
                      className={`w-6 h-6 text-text transform transition-transform duration-300 ${
                        isOpen ? "rotate-90" : "rotate-0"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </div>
                </button>

                <div
                  id={`step-content-${step.id}`}
                  role="region"
                  aria-labelledby={`step-title-${step.id}`}
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "max-h-96 opacity-100 pb-8 md:pb-10"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-lg text-mutedText font-light pl-4 pt-2 md:pt-4 max-w-6xl">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowToWork;
