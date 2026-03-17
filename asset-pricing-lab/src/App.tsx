import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.tsx';
import HomePage from './pages/HomePage.tsx';
import LearnPage from './pages/LearnPage.tsx';
import SimulationsPage from './pages/SimulationsPage.tsx';
import SimulationGamePage from './pages/SimulationGamePage.tsx';
import EquationExplorerPage from './pages/EquationExplorerPage.tsx';
import AboutPage from './pages/AboutPage.tsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/simulations" element={<SimulationsPage />} />
        <Route path="/simulations/:scenarioId" element={<SimulationGamePage />} />
        <Route path="/equations" element={<EquationExplorerPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}
