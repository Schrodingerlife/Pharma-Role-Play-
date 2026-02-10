import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-navy-dark py-8 mt-auto">
      <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} PharmaRoleplay AI. Powered by Gemini 2.0.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-cyan-neon transition-colors">Privacy</a>
          <a href="#" className="hover:text-cyan-neon transition-colors">Terms</a>
          <a href="#" className="hover:text-cyan-neon transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};
