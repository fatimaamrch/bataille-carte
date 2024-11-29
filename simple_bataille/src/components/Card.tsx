
import React from 'react';

interface CardProps {
  image?: string; 
  hidden?: boolean; 
}

const CardComponent: React.FC<CardProps> = ({ image, hidden }) => {
  if (hidden) {
    return (
      <div className="card-back w-24 h-32 bg-gray-800 border border-white rounded-lg relative shadow-sm">
       
        <div className="absolute inset-0 flex justify-center items-center opacity-40">
      
          <div className="w-16 h-16 border-2 border-white rounded-full flex justify-center items-center relative">
            <div className="w-12 h-12 bg-white transform rotate-45 absolute top-0 left-0 opacity-50"></div>
            <div className="w-12 h-12 bg-white transform rotate-45 absolute bottom-0 right-0 opacity-50"></div>
          </div>
        </div>

       
        <div className="absolute top-0 left-0 w-full h-full border-t-2 border-l-2 border-white opacity-15"></div>
        <div className="absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-white opacity-15"></div>

        
        <div className="absolute top-2 left-2 w-20 h-20 border-2 border-white rounded-md opacity-20"></div>
        <div className="absolute bottom-2 right-2 w-20 h-20 border-2 border-white rounded-md opacity-20"></div>

       
        <div className="absolute top-2 left-2 w-6 h-6 border-2 border-white rounded-full opacity-20"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-2 border-white rounded-full opacity-20"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-2 border-white rounded-full opacity-20"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-2 border-white rounded-full opacity-20"></div>

        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black opacity-05 rounded-lg"></div>
      </div>
    );
  }

  return (
    <img
      src={image}
      alt="Carte"
      className="w-24 h-32 rounded-lg shadow-lg"
    />
  );
};

export default CardComponent;
