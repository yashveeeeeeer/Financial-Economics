import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Simulations from './pages/Simulations';
import SimulationPlay from './pages/SimulationPlay';
import EquationExplorer from './pages/EquationExplorer';
import About from './pages/About';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="learn" element={<Learn />} />
          <Route path="simulations" element={<Simulations />} />
          <Route path="simulations/:id" element={<SimulationPlay />} />
          <Route path="equations" element={<EquationExplorer />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
