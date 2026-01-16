import React from 'react';

const SectionHeader = ({ title, description, size = 'lg', className = '' }) => {
  const titleSizes = {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-4xl',
    xl: 'text-4xl md:text-5xl',
  };

  const descSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  return (
    <header
      className={`mb-16 md:mb-24 text-center bg-clip-text text-transparent bg-text mx-auto ${className}`}
    >
      <h2
        className={`${titleSizes[size]} md:${titleSizes[size]} mb-8 tracking-tight text-4xl md:text-5xl xl:text-5xl font-bold leading-tight mx-auto max-w-3xl ${className}`}
      >
        {title}
      </h2>

      <div className={`w-full ${className}`}>
        {description && (
          <p className={`${descSizes[size]} text-mutedText mx-auto max-w-2xl ${className}`}>
            {description}
          </p>
        )}
      </div>
    </header>
  );
};

export default SectionHeader;
