import React from 'react';
import { Outlet } from 'react-router-dom';
import LanguageSwitcher from '../Language/LanguageSwitcher';

 // Adjust the import path if needed


const Layout = () => {
  return (
    <div>
      {/* This header will appear on every page that uses this layout */}
      <header style={{ padding: '1rem', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Vidyaverse</h3>
        <LanguageSwitcher />
      </header>

      <hr />

      {/* The <Outlet> component renders the current page's component */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;