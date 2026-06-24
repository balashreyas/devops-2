import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content" style={{ padding: '0 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
