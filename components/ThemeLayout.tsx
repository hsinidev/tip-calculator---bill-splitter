
import React, { useState, ReactNode, useCallback } from 'react';

type ModalType = 'About' | 'Contact' | 'Guide' | 'Privacy Policy' | 'Terms of Service' | 'DMCA' | null;

const Modal: React.FC<{ title: string; content: ReactNode; onClose: () => void }> = ({ title, content, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto p-8 border border-purple-500/50 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
        >
            &times;
        </button>
        <div className="mb-6 border-b border-gray-800 pb-4">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{title}</h2>
        </div>
        <div className="text-gray-300 space-y-6 leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
};

const ThemeLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = useCallback((modal: ModalType) => {
    setActiveModal(modal);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const getModalContent = (modal: ModalType): ReactNode => {
    switch (modal) {
      case 'About':
        return (
            <div>
                <p className="mb-4">Welcome to <strong>Doodax</strong>, the premier digital solution for modern dining finance. Doodax is more than just a calculator; it is a sophisticated tool designed to eliminate the social friction associated with bill splitting and tipping.</p>
                <p className="mb-4">Built with cutting-edge web technologies including React 18, TypeScript, and Tailwind CSS, Doodax ensures precision, speed, and privacy. Our "Galaxy" design philosophy aims to bring a moment of calm and beauty to the end of your meal.</p>
                <p>This project is proudly engineered and maintained by <strong>HSINI MOHAMED</strong>, dedicated to creating high-quality, user-centric web applications.</p>
            </div>
        );
      case 'Contact':
        return (
            <div>
                <p className="mb-4">We value your feedback and are here to assist with any inquiries regarding the Doodax application.</p>
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <h4 className="text-xl font-semibold mb-4 text-purple-300">Get in Touch</h4>
                    <p className="mb-2"><strong>General Inquiries:</strong> <a href="mailto:hsini.web@gmail.com" className="text-purple-400 hover:underline">hsini.web@gmail.com</a></p>
                    <p className="mb-2"><strong>Website:</strong> <a href="https://doodax.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">doodax.com</a></p>
                    <p className="mb-2"><strong>Developer Profile:</strong> <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">GitHub</a></p>
                </div>
                <p className="mt-4 text-sm text-gray-500">We aim to respond to all valid inquiries within 24-48 business hours.</p>
            </div>
        );
      case 'Guide':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-300">Mastering the Doodax Calculator</h3>
            <p>Our tool is designed for intuitiveness, but here is a quick guide to getting the most out of it:</p>
            <ol className="list-decimal list-inside space-y-3 pl-2">
              <li><strong>Input Total Bill:</strong> Enter the final amount from your check before tip.</li>
              <li><strong>Select Gratuity:</strong> Tap one of the quick-select buttons (15%, 18%, 20%) for standard service, or use the "Custom" field for specific percentages.</li>
              <li><strong>Party Size:</strong> Enter the number of people sharing the cost.</li>
              <li><strong>Smart Rounding:</strong> Use the "Round Up" feature to round the total bill to the nearest whole dollar. This is perfect for cash payments or keeping bank statements clean.</li>
              <li><strong>Instant Results:</strong> Observe the breakdown on the right (or bottom on mobile) update instantly as you type.</li>
            </ol>
          </div>
        );
      case 'Privacy Policy':
        return (
            <div className="text-sm">
                <p className="mb-4"><strong>Last Updated: October 27, 2023</strong></p>
                <p className="mb-4">At Doodax, we take your privacy seriously. This Privacy Policy explains how we handle information in relation to your use of our web application.</p>
                
                <h4 className="text-lg font-bold text-white mt-4 mb-2">1. No Data Collection</h4>
                <p className="mb-4">Doodax is a client-side application. This means that all calculations (bill amounts, tip percentages, number of people) happen entirely within your device's web browser. We do not transmit, store, or process any of the financial data you enter on our servers.</p>
                
                <h4 className="text-lg font-bold text-white mt-4 mb-2">2. Cookies and Local Storage</h4>
                <p className="mb-4">We do not use tracking cookies or persistent local storage to track your behavior. The application state is transient and resets when you refresh the page.</p>
                
                <h4 className="text-lg font-bold text-white mt-4 mb-2">3. Third-Party Services</h4>
                <p className="mb-4">This website may be hosted on platforms (like Vercel, Netlify, or GitHub Pages) that collect standard server logs (IP addresses) for security and performance monitoring. Please refer to the hosting provider's privacy policy for details.</p>
                
                <h4 className="text-lg font-bold text-white mt-4 mb-2">4. Contact Us</h4>
                <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hsini.web@gmail.com" className="text-purple-400">hsini.web@gmail.com</a>.</p>
            </div>
        );
      case 'Terms of Service':
        return (
            <div className="text-sm">
                 <p className="mb-4"><strong>Effective Date: October 27, 2023</strong></p>
                 <p className="mb-4">By accessing or using Doodax (doodax.com), you agree to be bound by these Terms of Service.</p>

                 <h4 className="text-lg font-bold text-white mt-4 mb-2">1. Use of Service</h4>
                 <p className="mb-4">Doodax is provided for personal, non-commercial use. You agree not to misuse the service or attempt to interfere with its proper working.</p>

                 <h4 className="text-lg font-bold text-white mt-4 mb-2">2. Disclaimer of Warranties</h4>
                 <p className="mb-4">The service is provided "as is" and "as available" without any warranties of any kind. While we strive for accuracy, Doodax is not responsible for any calculation errors, financial discrepancies, or issues arising from the use of this tool. Always verify final amounts before payment.</p>

                 <h4 className="text-lg font-bold text-white mt-4 mb-2">3. Limitation of Liability</h4>
                 <p className="mb-4">In no event shall Doodax, its developers, or affiliates be liable for any indirect, incidental, special, or consequential damages arising out of your use of the service.</p>

                 <h4 className="text-lg font-bold text-white mt-4 mb-2">4. Changes to Terms</h4>
                 <p>We reserve the right to modify these terms at any time. Your continued use of the website constitutes acceptance of those changes.</p>
            </div>
        );
      case 'DMCA':
        return (
            <div className="text-sm">
                <p className="mb-4">Doodax respects the intellectual property rights of others. We comply with the Digital Millennium Copyright Act (DMCA).</p>
                
                <h4 className="text-lg font-bold text-white mt-4 mb-2">Reporting Infringement</h4>
                <p className="mb-4">If you believe that material available on Doodax infringes your copyright, please notify us by sending a DMCA notice to <a href="mailto:hsini.web@gmail.com" className="text-purple-400">hsini.web@gmail.com</a>. Your notice must include:</p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                    <li>Identify the copyrighted work that you claim has been infringed.</li>
                    <li>Identify the material that is claimed to be infringing.</li>
                    <li>Your contact information (address, telephone number, and email).</li>
                    <li>A statement that you have a good faith belief that the use is not authorized by the copyright owner.</li>
                    <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner.</li>
                </ul>
                <p>Upon receipt of a valid DMCA notice, we will remove or disable access to the infringing material.</p>
            </div>
        );
      default:
        return null;
    }
  };

  const navLinks: ModalType[] = ['About', 'Guide', 'Contact', 'Privacy Policy', 'Terms of Service', 'DMCA'];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-40 bg-black/40 backdrop-blur-md border-b border-white/10">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {/* Logo placeholder if needed, text is sufficient */}
            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 tracking-tight">
              Doodax
            </span>
          </div>
          <div className="hidden lg:flex space-x-8">
            {navLinks.map(link => (
              <button 
                key={link} 
                onClick={() => openModal(link)} 
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wider hover:underline underline-offset-4 decoration-purple-500"
              >
                {link}
              </button>
            ))}
          </div>
           <div className="lg:hidden">
             <select 
                onChange={(e) => {
                    if (e.target.value) openModal(e.target.value as ModalType);
                    e.target.value = ""; // Reset
                }} 
                className="bg-gray-800 border border-gray-600 text-white rounded p-2 focus:ring-2 focus:ring-purple-500 outline-none"
             >
                <option value="">Menu</option>
                 {navLinks.map(link => (
                    <option key={link} value={link}>{link}</option>
                ))}
             </select>
           </div>
        </nav>
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {children}
      </main>

      <footer className="mt-auto py-8 bg-black/60 backdrop-blur-sm border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4">
             <span className="text-2xl font-bold text-white">Doodax</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            The ultimate tool for financial fairness at the dinner table.
          </p>
          <div className="flex justify-center space-x-6 mb-6">
             <a href="https://doodax.com" className="text-gray-400 hover:text-purple-400 transition-colors">Home</a>
             <button onClick={() => openModal('Privacy Policy')} className="text-gray-400 hover:text-purple-400 transition-colors">Privacy</button>
             <button onClick={() => openModal('Terms of Service')} className="text-gray-400 hover:text-purple-400 transition-colors">Terms</button>
             <button onClick={() => openModal('Contact')} className="text-gray-400 hover:text-purple-400 transition-colors">Contact</button>
          </div>
          <p className="text-gray-500 text-xs">
            Powered by <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="font-bold text-yellow-400 hover:text-yellow-300">HSINI MOHAMED</a>
          </p>
          <p className="text-gray-600 text-xs mt-2">
            &copy; {new Date().getFullYear()} Doodax. All rights reserved.
          </p>
        </div>
      </footer>

      {activeModal && (
        <Modal title={activeModal} content={getModalContent(activeModal)} onClose={closeModal} />
      )}
    </div>
  );
};

export default ThemeLayout;
