import React from "react";

// Define the Property1Default component
const Property1Default: React.FC = () => {
  return (
    <div className="w-[325px] h-[390px] border border-gray-300 rounded-lg shadow-md p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium">Figma to React</span>
        <button className="text-sm">X</button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-full">
        {/* Icons */}
        <div className="flex items-center mb-4">
          <div className="w-[40px] h-[40px] bg-red-500 rounded-full flex items-center justify-center">
            {/* Figma Icon Placeholder */}
            <span className="text-white">F</span>
          </div>
          <span className="mx-2">→</span>
          <div className="w-[40px] h-[40px] bg-blue-500 rounded-full flex items-center justify-center">
            {/* React Icon Placeholder */}
            <span className="text-white">R</span>
          </div>
        </div>

        {/* Text */}
        <span className="text-sm mb-4">Select a frame</span>

        {/* Button */}
        <button className="w-[200px] h-[40px] bg-gray-200 rounded-md text-sm">
          Convert Selection to React
        </button>
      </div>
    </div>
  );
};

export default Property1Default;
