import React from 'react';
import SectionHeader from '../common/SectionHeader';

const solutions = [
  {
    principle: 'User-First Thinking',
    action:
      'I design interfaces based on real user behavior, accessibility standards, and clarity — not assumptions.',
    impact:
      'Users immediately understand the product, trust it faster, and interact with confidence.',
  },
  {
    principle: 'Performance as a Feature',
    action: 'From architecture to assets, performance decisions are made early, not patched later.',
    impact:
      'Faster load times, smoother interactions, and consistently strong performance on all devices.',
  },
  {
    principle: 'Scalable Architecture',
    action:
      'I structure applications with clean separation of concerns and long-term growth in mind.',
    impact:
      'New features can be added safely without breaking existing systems or increasing tech debt.',
  },
  {
    principle: 'Transparent Execution',
    action: 'Every phase is planned, communicated, and aligned with clear goals and deliverables.',
    impact: 'Clients always know progress, priorities, and next steps — no surprises.',
  },
];

const Solutions = () => {
  return (
    <section className="relative py-24 lg:py-36">
      <div className="mx-auto px-5 sm:px-7 lg:px-10">
        {/* Header */}
        <SectionHeader
          title={
            <span>
              How I consistently turn ideas <br className="hidden sm:block" />
              into reliable digital products
            </span>
          }
          description="Not a checklist. A system built on principles that scale with real-world projects."
          size="xl"
          className="text-center"
        />

        {/* Framework */}
        <div className="relative mt-28 space-y-24">
          {/* Vertical guide (desktop only) */}
          <div className="hidden lg:block absolute left-[420px] top-0 h-full w-px bg-border" />

          {solutions.map((item, index) => (
            <div key={index} className="grid gap-12 lg:grid-cols-[420px_1fr] items-start">
              {/* Principle Column */}
              <div className="space-y-5">
                <span className="inline-block text-sm tracking-widest uppercase text-primary/70">
                  Principle {String(index + 1).padStart(2, '0')}
                </span>

                <h3 className="text-3xl lg:text-4xl font-semibold text-text leading-tight">
                  {item.principle}
                </h3>

                {/* Subtle divider */}
                <div className="w-16 h-px bg-border" />
              </div>

              {/* Execution Column */}
              <div className="relative space-y-6 lg:pl-16">
                {/* Connector line */}
                <div className="hidden lg:block absolute -left-16 top-4 w-16 h-px bg-border" />

                <p className="text-lg lg:text-2xl text-mutedText leading-relaxed">
                  {item.action}
                </p>

                <p className="text-mutedText leading-relaxed">
                  <span className="font-medium text-text">Impact:</span> {item.impact}
                </p>

                {/* Divider */}
                <div className="pt-10 border-t border-border" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
