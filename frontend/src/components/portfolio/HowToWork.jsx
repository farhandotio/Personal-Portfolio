import React, { useState } from 'react';
import SectionHeader from '../common/SectionHeader';

const steps = [
  {
    id: 1,
    week: 'Phase 1',
    title: 'Project Discovery & Goal Alignment',
    description:
      'I begin by deeply understanding your goals, users, and constraints so we solve the right problems before writing any code.',
    deliverables: [
      'Project brief',
      'User personas',
      'Competitive analysis',
      'Clear success metrics',
    ],
    collaboration: {
      main: 'Kickoff Call',
      note: 'Align scope, priorities and timelines together',
    },
  },
  {
    id: 2,
    week: 'Phase 1',
    title: 'Wireframe Architecture',
    description:
      'I design low-fidelity wireframes to validate structure, content priority, and user flow early.',
    deliverables: ['Wireframes', 'Information architecture', 'Flow validation'],
    collaboration: {
      main: 'Wireframe Review',
      note: 'Iterative feedback before visual design',
    },
  },
  {
    id: 3,
    week: 'Phase 2',
    title: 'High-Fidelity UI Design',
    description:
      'Approved wireframes are translated into pixel-perfect UI with strong hierarchy and accessibility.',
    deliverables: ['UI screens', 'Design system', 'Reusable components'],
    collaboration: {
      main: 'Design Review',
      note: 'Refinement until design is production-ready',
    },
  },
  {
    id: 4,
    week: 'Phase 2',
    title: 'Frontend Development',
    description: 'I build a fast, responsive, component-based frontend using modern frameworks.',
    deliverables: ['Responsive UI', 'Animations', 'Optimized components'],
  },
  {
    id: 5,
    week: 'Phase 3',
    title: 'Backend & API Integration',
    description:
      'Secure APIs, data models and server logic are integrated to power real functionality.',
    deliverables: ['API integration', 'Database setup', 'Authentication & core logic'],
  },
  {
    id: 6,
    week: 'Phase 3',
    title: 'Testing & Quality Assurance',
    description: 'I test across devices, browsers and real-world scenarios to ensure reliability.',
    deliverables: ['Bug fixes', 'Performance optimization', 'Cross-device testing'],
  },
  {
    id: 7,
    week: 'Phase 4',
    title: 'Deployment & Delivery',
    description: 'Production deployment with documentation and post-launch support.',
    deliverables: ['Live deployment', 'Documentation', '30-day support'],
  },
];

const HowToWork = () => {
  const [activeStep, setActiveStep] = useState(steps[0]);

  return (
    <section className="py-10 bg-bg">
      <div className="mx-auto container px-5 sm:px-7 lg:px-10">
        <SectionHeader
          title="How I Turn Ideas Into Working Products"
          description="A clear, structured process that minimizes risk and maximizes clarity."
          size="xl"
          className="text-center"
        />

        <div className="mt-20 grid lg:grid-cols-12 gap-12">
          {/* LEFT – Steps */}
          <div className="lg:col-span-4 space-y-3">
            {steps.map((step) => {
              const isActive = step.id === activeStep.id;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step)}
                  className={`w-full text-lg text-left px-5 py-2 rounded-xl border transition
                    ${
                      isActive
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:bg-hoverCardBg'
                    }`}
                >
                  <h4 className="text font-semibold text-text mt-1">
                    {step.id}. {step.title}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* RIGHT – Details */}
          <div className="lg:col-span-8">
            <div className="border border-border rounded-2xl p-5 md:p-8 bg-cardBg transition-all duration-300">
              <span className="text-sm text-primary font-medium">{activeStep.week}</span>

              <h3 className="text-4xl font-semibold text-text mt-3">{activeStep.title}</h3>

              <p className="text-mutedText text-xl mt-5 leading-relaxed">
                {activeStep.description}
              </p>

              {/* Deliverables */}
              {activeStep.deliverables && (
                <div className="mt-8">
                  <h5 className="text font-semibold text-text mb-4">Key Deliverables</h5>
                  <ul className="grid sm:grid-cols-2 gap-2 text text-mutedText">
                    {activeStep.deliverables.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Collaboration */}
              {activeStep.collaboration && (
                <div className="mt-9 border-l-2 border-primary/40 pl-4">
                  <p className="text-sm font-medium text-text">{activeStep.collaboration.main}</p>
                  <p className="text text-mutedText">{activeStep.collaboration.note}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToWork;
