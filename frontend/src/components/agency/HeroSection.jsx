import React from "react";

const HeroSection = () => {
  return (
    <section
      className="bg-bg overflow-hidden min-h-[650px] pt-20 flex items-center"
      aria-label="Farhan Sadik Solutions"
      itemScope
      itemType="https://schema.org/WebPage"
      role="region"
    >
      {/* Container for content and images */}
      <div className="p-5 sm:p-7 lg:p-10 flex flex-col items-center">
        {/* Text Content Area */}
        <div className="mb-12 lg:mb-0 lg:pr-16">
          {/* Main SEO Heading */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-text"
            itemProp="headline"
          >
            <span>Farhan Sadik</span> <br />
            <span className="block pt-2 text-primary"> — Fullstack, </span>
            <span className="max-lg:block text-secondary"> Frontend & </span>
            <span className="max-lg:block"> Backend Solutions </span>
          </h1>

          {/* Description Paragraph */}
          <p
            className="mt-6 text-2xl leading-relaxed max-w-4xl text-mutedText"
            itemProp="description"
          >
            Icraft digital experiences that drive results. From concept to
            deployment,Ibuild scalable web applications that grow with your
            business.
          </p>
        </div>
      </div>

      {/* Non-visual SEO additions (keeps visible content unchanged) */}
      <meta
        name="description"
        content="Farhan Sadik provides Fullstack, Frontend, and Backend Solutions.Ibuild scalable web applications from concept to deployment that drive results for your business."
      />
      <meta
        name="keywords"
        content="Farhan Sadik, fullstack, frontend development, backend development, web applications, scalable web apps"
      />

      {/* JSON-LD structured data for better indexing and rich results */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Farhan Sadik",
          url: "https://your-agency-website.com",
          description:
            "Farhan Sadik provides Fullstack, Frontend, and Backend Solutions.Ibuild scalable web applications from concept to deployment that drive results for your business.",
          sameAs: [
            "https://github.com/master-farhan",
            "https://www.linkedin.com/in/md-farhan-sadik",
          ],
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Farhan Sadik — Fullstack, Frontend & Backend Solutions",
          description:
            "Farhan Sadik provides Fullstack, Frontend, and Backend Solutions.Ibuild scalable web applications from concept to deployment that drive results for your business.",
          url: "https://your-agency-website.com",
        })}
      </script>
    </section>
  );
};

export default React.memo(HeroSection);
