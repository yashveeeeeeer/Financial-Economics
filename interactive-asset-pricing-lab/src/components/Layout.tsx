import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-surface-900">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <footer className="border-t border-gray-800 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-gray-500 text-sm">
          <p>Interactive Asset Pricing Lab — Built for Financial Economics Education</p>
          <p className="mt-1 text-gray-600">
            Concepts based on the stochastic discount factor framework
          </p>
        </div>
      </footer>
    </div>
  );
}
