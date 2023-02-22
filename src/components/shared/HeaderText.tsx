import React from 'react';

export const HeaderText = ({ title }: { title: string }) => {
  return (
    <h3 className="mb-10 text-3xl font-extrabold leading-normal tracking-tight text-gray-900 sm:text-3xl">
      {title}
    </h3>
  );
};
