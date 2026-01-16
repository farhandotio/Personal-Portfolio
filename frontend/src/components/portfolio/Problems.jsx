import React from 'react';
import { FiAlertCircle, FiZap, FiLayers, FiClock } from 'react-icons/fi';
import SectionHeader from '../common/SectionHeader';

const problems = [
  {
    icon: FiAlertCircle,
    title: 'Confusing User Experience',
    description:
      'When users struggle to understand navigation or intent, trust drops instantly and bounce rates spike.',
  },
  {
    icon: FiZap,
    title: 'Performance Bottlenecks',
    description:
      'Slow load times and unoptimized assets quietly destroy engagement before users even see value.',
  },
  {
    icon: FiLayers,
    title: 'Fragile & Unscalable Code',
    description:
      'Poor architecture turns small feature requests into expensive, high-risk changes.',
  },
  {
    icon: FiClock,
    title: 'Unclear Development Process',
    description: 'Without structure and transparency, timelines slip and expectations break down.',
  },
];

const Problems = () => {
  return (
    <section className="relative py-10">
      <div className="mx-auto container px-5 sm:px-7 lg:px-10">
        <SectionHeader
          title={
            <span>
              Why most digital products <br className="hidden sm:block" />
              struggle to succeed
            </span>
          }
          description="Strong ideas alone are not enough. These execution gaps are the real reason
          products fail to gain traction."
          size="xl"
        />

        <div className="md:grid md:grid-cols-3 gap-20 items-start mt-20">
          {/* LEFT: Authority Narrative */}
          <div className="lg:sticky lg:top-32 space-y-8">
            <span className="inline-block text-sm tracking-wider uppercase text-primary/70">
              A recurring pattern
            </span>

            <h2 className="text-3xl lg:text-4xl font-semibold text-text leading-tight">
              These problems don’t come from bad ideas —
              <span className="text-primary"> they come from poor execution.</span>
            </h2>

            <p className="text-mutedText text-xl leading-relaxed">
              I’ve worked with startups, founders, and growing teams where the vision was strong,
              but the product failed to connect, scale, or perform.
            </p>

            <p className="text-mutedText text-lg leading-relaxed">
              Across different industries, the root causes were almost always the same — not
              technology limits, but decision-making, structure, and priorities.
            </p>

            {/* Subtle visual divider */}
            <div className="pt-6 border-t-2 border-border w-24" />
          </div>

          {/* RIGHT: Problem Flow */}
          <div className="relative space-y-14 col-span-2">
            {/* Vertical guide */}
            <div className="absolute left-6 top-0 h-full w-px bg-border" />

            {problems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative flex gap-8 pl-20">
                  {/* Icon Node */}
                  <div className="absolute left-0 top-1">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full
                      bg-bg border border-border text-primary
                      shadow-md shadow-primary/10"
                    >
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-3xl font-semibold text-text">{item.title}</h3>
                    <p className="text-mutedText leading-relaxed text-xl ">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problems;
