
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} CropNurture AI. All Rights Reserved.</p>
        <p className="text-sm mt-1">Disclaimer: This tool provides recommendations based on AI and should be used for informational purposes only. Always consult with a local agricultural expert.</p>
      </div>
    </footer>
  );
};

export default Footer;
