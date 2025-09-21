import React from 'react';
import { Outlet } from 'react-router-dom';
// The import path has been corrected to navigate up one level.
import LanguageSwitcher from '/src/Components/Language/LanguageSwitcher';

/**
 * A universal Layout component that renders the language switcher
 * in the top-right corner of the screen for all pages.
 */
const Layout = () => {
  return (
    <>
      {/* This div places the switcher on top of all other content */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* The rest of your page component will be rendered here */}
      <Outlet />
    </>
  );
};

export default Layout;

