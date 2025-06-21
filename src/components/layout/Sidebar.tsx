import React from 'react';
import './Sidebar.scss';
import { X, ChevronDown } from 'lucide-react';

// Import all your image assets
import briefcaseIcon from '/public/Images/Icons/bagIcon.png';
import houseicon from '/public/Images/Icons/houseicon.png';
// CUSTOMERS
import usersGroupIcon from '/public/Images/Icons/Users3.png';
import usersIcon from '/public/Images/Icons/usersIcon.png';
import sackIcon from '/public/Images/Icons/sack.png';
import handShake from '/public/Images/Icons/handShake.png';
import savings from '/public/Images/Icons/savings.png';
import userCheck from '/public/Images/Icons/userCheck.png';
import userCancel from '/public/Images/Icons/userCancel.png';
// BUSINESSES
import bankHouse from '/public/Images/Icons/bankHouse.png';
import coinsIcon from '/public/Images/Icons/coinsIcon.png';
import phoneArrow from '/public/Images/Icons/phoneArrow.png';
import serviceIcon from '/public/Images/Icons/serviceIcon.png';
import userSetting from '/public/Images/Icons/userSetting.png';
import settlement from '/public/Images/Icons/settlement.png';
import reporticon from '/public/Images/Icons/reporticon.png';
// SETTINGS
import settingsIcon from '/public/Images/Icons/settingsIcon.png';
import settingsILabel from '/public/Images/Icons/settingsILabel.png';
import auditIcon from '/public/Images/Icons/auditIcon.png';
import systemMSGicon from '/public/Images/Icons/systemMSGicon.png';


// --- Data Arrays for our Links (This part was perfect) ---
const customerLinks = [
  { label: 'Users', icon: usersIcon, active: true },
  { label: 'Guarantors', icon: usersGroupIcon },
  { label: 'Loans', icon: sackIcon },
  { label: 'Decision Models', icon: handShake },
  { label: 'Savings', icon: savings },
  { label: 'Loan Requests', icon: sackIcon },
  { label: 'Whitelist', icon: userCheck },
  { label: 'Karma', icon: userCancel },
];
const businessLinks = [
  { label: 'Organization', icon: briefcaseIcon },
  { label: 'Loan Products', icon: sackIcon },
  { label: 'Savings Products', icon: bankHouse },
  { label: 'Fees and Charges', icon: coinsIcon },
  { label: 'Transactions', icon: phoneArrow },
  { label: 'Services', icon: serviceIcon },
  { label: 'Service Account', icon: userSetting },
  { label: 'Settlements', icon: settlement },
  { label: 'Reports', icon: reporticon },
];
const settingsLinks = [
  { label: 'Preferences', icon: settingsIcon },
  { label: 'Fees and Pricing', icon: settingsILabel },
  { label: 'Audit Logs', icon: auditIcon },
  { label: 'Systems Messages', icon: systemMSGicon },
];

// Define component props
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  // Create the dynamic class name based on the isOpen prop
  const sidebarClassName = `sidebar ${isOpen ? 'open' : ''}`;

  return (
    // <-- THE MAIN FIX: Apply the dynamic class name here
    <div className={sidebarClassName}>
      <div className="sidebar-top">
        <a href="#" className="nav-link switch-org">
          <img src={briefcaseIcon} alt="Organization Icon" className="nav-icon" />
          <span>Switch Organization</span>
          <ChevronDown size={20} />
        </a>
        <a href="#" className="nav-link">
          <img src={houseicon} alt="Dashboard Icon" className="nav-icon" />
          <span>Dashboard</span>
        </a>
        {/* The close icon is now correctly part of the component */}
        <div className="mobile-close-icon" onClick={onClose}>
          <X size={28} />
        </div>
      </div>

      <nav className="sidebar-nav">
        {/* --- CUSTOMERS SECTION --- */}
        <h2 className="nav-category">CUSTOMERS</h2>
        <ul>
          {customerLinks.map((link) => (
            <li key={link.label}>
              <a href="#" className={`nav-link ${link.active ? 'active' : ''}`}>
                <img src={link.icon} alt={`${link.label} Icon`} className="nav-icon" />
                <span>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* --- BUSINESSES SECTION --- */}
        <h2 className="nav-category">BUSINESSES</h2>
        <ul>
          {businessLinks.map((link) => (
            <li key={link.label}>
              <a href="#" className="nav-link">
                <img src={link.icon} alt={`${link.label} Icon`} className="nav-icon" />
                <span>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* --- SETTINGS SECTION --- */}
        <h2 className="nav-category">SETTINGS</h2>
          <ul>
          {settingsLinks.map((link) => (
            <li key={link.label}>
              <a href="#" className="nav-link">
                <img src={link.icon} alt={`${link.label} Icon`} className="nav-icon" />
                <span>{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;