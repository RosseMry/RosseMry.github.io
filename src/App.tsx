import { Route, Routes } from 'react-router-dom';
import { FlowerCursor } from './components/Cursor/FlowerCursor';
import { Nav } from './components/Nav/Nav';
import { Home } from './pages/Home';
import { WorkPage } from './pages/WorkPage';

function App() {
  return (
    <>
      <a href="#home" className="skip-link">
        Skip to content
      </a>
      <FlowerCursor />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<WorkPage />} />
      </Routes>
    </>
  );
}

export default App;
