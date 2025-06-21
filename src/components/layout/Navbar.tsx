import React from 'react';
import './Navbar.scss';
import LendsqrLogo from '../../../public/Images/LendsqrLogo.png';
import NotificationBell from '/public/Images/Icons/NotificationBell.png';
import UserAvatar from '../../../public/Images/user-avatar.png';
import chevronDown from '/public/Images/Icons/chevronDown.png';
import { Search, Menu } from 'lucide-react';

// Add onMenuClick to the props
interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <header className="navbar">
      <div className="nav-left">
        <img src={LendsqrLogo} alt="Lendsqr Logo" className="logo" />
        {/* Hamburger Menu Icon for Mobile */}
        <div className="mobile-menu-icon" onClick={onMenuClick}>
          <Menu size={32} />
        </div>
      </div>

      {/* ... nav-center (search bar)*/}
      <div className="nav-center">
        <div className="search-bar">
          <input type="text" placeholder="Search for anything" />
          <button className="search-button">
            <Search size={16} color="#ffffff" />
          </button>
        </div>
      </div>

      {/* ... nav-right*/}
      <div className="nav-right">
        <a href="#" className="docs-link">Docs</a>
        <div className="notification-icon">
           <img src={NotificationBell} className='NotificationBell' alt="NotificationBell" />
        </div>
        <div className="user-profile">
          <img src={UserAvatar} alt="User Avatar" className="avatar" />
          <span className="username">Adedeji</span>
          <img src={chevronDown} className='chevronDown' alt="chevronDown" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;