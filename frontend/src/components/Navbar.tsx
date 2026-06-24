import { Link } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="glass-panel" style={{ margin: '20px auto', maxWidth: '1200px', padding: '15px 30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <ChefHat className="text-neon-pink" size={32} />
        <h1 className="text-gradient" style={{ fontSize: '2rem', margin: 0, textAlign: 'center' }}>Vice City Chefs: Hyderabadi Edition</h1>
      </Link>
    </nav>
  );
};

export default Navbar;
