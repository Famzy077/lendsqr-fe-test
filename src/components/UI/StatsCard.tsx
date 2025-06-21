import React from 'react';
import './StatsCard.scss';

interface StatsCardProps {
  icon: string;
  iconBgColor: string;
  label: string;
  value: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, iconBgColor, label, value }) => {
  return (
    <div className="stats-card">
      <div className="icon-container" style={{ backgroundColor: iconBgColor }}>
        <img src={icon} alt={`${label} icon`} />
      </div>
      <p className="label">{label}</p>
      <p className="value">{value}</p>
    </div>
  );
};

export default StatsCard;