import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Play, FunctionSquare, Info, ArrowLeft } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;
const PORTAL_URL = BASE.replace(/\/asset-pricing-lab\/$/, '/');

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/learn', label: 'Learn', icon: BookOpen },
  { to: '/simulations', label: 'Simulations', icon: Play },
  { to: '/equations', label: 'Equations', icon: FunctionSquare },
  { to: '/about', label: 'About', icon: Info },
];

export default function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <a
              href={PORTAL_URL}
              className="flex items-center gap-1 text-text-muted hover:text-text-secondary transition-colors text-xs"
              title="Back to Financial Economics Lab"
            >
              <ArrowLeft className="w-3 h-3" />
              <span className="hidden sm:inline">Lab</span>
            </a>
            <div className="w-px h-4 bg-border" />
            <Link to="/" className="flex items-center gap-2">
              <span className="text-lg font-bold text-accent-blue">λ</span>
              <span className="text-sm font-semibold text-text-primary hidden sm:block">
                Asset Pricing Lab
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-1">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
              const active = to === '/' ? path === '/' : path.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                    transition-colors
                    ${
                      active
                        ? 'bg-accent-blue/15 text-accent-blue'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                    }
                  `}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
