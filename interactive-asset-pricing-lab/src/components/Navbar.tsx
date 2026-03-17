import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/learn', label: 'Learn' },
  { path: '/simulations', label: 'Simulations' },
  { path: '/equations', label: 'Equations' },
  { path: '/about', label: 'About' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-900/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">
              AP
            </div>
            <span className="font-semibold text-white text-sm hidden sm:block">
              Asset Pricing Lab
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-3 py-2 text-sm font-medium transition-colors"
                >
                  <span className={isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-1 right-1 h-0.5 bg-accent-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
