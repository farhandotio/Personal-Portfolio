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
      className={`mb-16 md:mb-24 text-center bg-clip-text text-transparent bg-linear-to-r from-text to-primary mx-auto ${className}`}
    >
      <h2
        className={`${titleSizes[size]} md:${titleSizes[size]} font-extrabold mb-8 leading-tight tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white to-primary mx-auto max-w-3xl ${className}`}
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
