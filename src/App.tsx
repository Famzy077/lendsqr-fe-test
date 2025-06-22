import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar'; 
import './index.scss';
const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const appLayoutClassName = `app-layout ${isMobileMenuOpen ? 'mobile-menu-active' : ''}`;

  return (
    <div className={appLayoutClassName}>
      <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />

        {isMobileMenuOpen && (
          <div 
            className="mobile-menu-backdrop" 
            onClick={() => setIsMobileMenuOpen(false)}
          >

          </div>
        )}

      <div  className="app-container">
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;