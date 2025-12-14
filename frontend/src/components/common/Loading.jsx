import React from 'react';

const Loading = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-4">
      <div className="w-8 h-8 border-4 border-t-primary border-b-primary border-gray-200 rounded-full animate-spin"></div>

      {text && <span className="text-sm text-mutedText">{text}</span>}
    </div>
  );
};

export default Loading;
