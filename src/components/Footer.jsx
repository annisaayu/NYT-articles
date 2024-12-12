import React from 'react';

const Footer = () => {
  return (
    <footer className="text-xs text-center p-4 bg-darkGrey text-foggyGrey">
      <p>Data provided by <a href="https://www.nytimes.com" target="_blank" rel="noopener noreferrer" className="text-warmGold hover:underline">The New York Times Company</a>. Designed and developed by annisaayu. </p>
      <p>Copyright &copy; {new Date().getFullYear()} Annisa Ayu. All rights reserved.</p>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;