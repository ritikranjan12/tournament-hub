import React from 'react';

const Fireworks = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center pointer-events-none">
      <div className="firework h-2 w-2 bg-red-500 rounded-full animate-firework" />
      <div className="firework h-2 w-2 bg-yellow-500 rounded-full animate-firework" />
      <div className="firework h-2 w-2 bg-blue-500 rounded-full animate-firework" />
      <div className="firework h-2 w-2 bg-green-500 rounded-full animate-firework" />
      <div className="firework h-2 w-2 bg-purple-500 rounded-full animate-firework" />
      <div className="firework h-2 w-2 bg-pink-500 rounded-full animate-firework" />
      <div className="firework h-2 w-2 bg-orange-500 rounded-full animate-firework" />
    </div>
  );
};

export default Fireworks;
