import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar'; 
import './index.scss';
const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />

      <div className="app-container">
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default App;