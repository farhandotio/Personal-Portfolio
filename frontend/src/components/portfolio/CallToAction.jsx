import React from 'react';
import PrimaryButton from '../common/PrimaryButton';
import SectionHeader from '../common/SectionHeader';

const CallToAction = () => {
  return (
    <section className="relative overflow-hidden pt-10 pb-30 px-6 bg-bg">
      {/* Glow Background */}
      <div className="absolute bottom-0 left-50 flex justify-center">
        <div className="w-100 h-100 bg-primary/20 blur-3xl rounded-full"></div>
      </div>
      <div className="absolute top-30 right-50 flex justify-center">
        <div className="w-100 h-100 bg-primary/20 blur-3xl rounded-full"></div>
      </div>
      <div>
        <SectionHeader
          title="Ready to turn your idea into a real product?"
          description="We design, build & scale high-performance web experiences that convert visitors into
          customers."
          size="xl"
          className="text-center"
        />

        <p className="mt-6 text-lg text-mutedText"></p>

        {/* Features */}
        <div className="mt-10 flex justify-center gap-6 flex-wrap">
          <div className="px-5 py-2 rounded-full bg-white/5 text-mutedText border border-white/10">
            ⚡ Fast Delivery
          </div>
          <div className="px-5 py-2 rounded-full bg-white/5 text-mutedText border border-white/10">
            🎨 Modern UI/UX
          </div>
          <div className="px-5 py-2 rounded-full bg-white/5 text-mutedText border border-white/10">
            🔒 Secure & Scalable
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-12 flex justify-center gap-5 max-md:flex-wrap">
          <div className='max-md:w-full'>
            <PrimaryButton
              text={'Book a Free Call'}
              url={'/book-a-call'}
              className="rounded-full"
              size="xl"
            />
          </div>

          <div className='max-md:w-full'>
            <PrimaryButton
              text={'How It Works'}
              url={'/process'}
              className="rounded-full"
              bgColor="bg-secondary"
              size="xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
