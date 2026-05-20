import React from 'react';

type BlogMeterProps = {
  count: number;
};

export const BlogMeter: React.FC<BlogMeterProps> = ({ count }) => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 shadow-xl mb-8">
      <span className="text-3xl font-extrabold">{count}</span>
      <span className="ml-3 text-xl font-medium">Blogs Published</span>
    </div>
  );
};
