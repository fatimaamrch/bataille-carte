import React from 'react';

interface CardProps {
  suit: string;
  value: string;
}

const Card: React.FC<CardProps> = ({ suit, value }) => {
  return (
    <div className="card bg-white border border-gray-300 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{value}</h2>
      <p className="text-sm">{suit}</p>
    </div>
  );
};

export default Card;
