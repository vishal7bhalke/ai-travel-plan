import React from 'react';

function Footer() {
  return (
    <footer className="my-10 py-4 text-center text-gray-400">
      <h2 className="text-lg font-medium">
        Created by Tushar Tiwari | Ai Travel Planner App | © {new Date().getFullYear()}
      </h2>
    </footer>
  );
}

export default Footer;

