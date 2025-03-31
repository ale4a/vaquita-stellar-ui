import React from "react";

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, subtitle }) => {
  return (
    <div className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm w-full">
      <div className="text-4xl text-gray-600">{icon}</div>
      <div>
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
};

export default StatsCard;
