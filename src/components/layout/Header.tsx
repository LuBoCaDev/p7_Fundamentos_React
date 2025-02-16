import { logout } from '../../pages/auth/service';
import Button from '../shared/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import wallaLogo from '../../assets/peach.svg';
import './Header.css';

interface Props {
  onLogout: () => void;
}

export default function Header({ onLogout }: Props) {
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    const confirmLogout = window.confirm('Do you really wanna log out?');
    if (confirmLogout) {
      await logout();
      onLogout();
      navigate('/login');
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={wallaLogo} alt="Logo" className="header-logo" />
        
        <nav className="header-nav">
          <NavLink to="/adverts" className={({ isActive }) => (isActive ? 'selected' : '')}>
            Walla-Adverts
          </NavLink>

          <NavLink to="/adverts/new" className={({ isActive }) => (isActive ? 'selected' : '')}>
            New Advert
          </NavLink>
        </nav>
      </div>

      <div className="header-right">
        <Button $variant="primary" onClick={handleLogoutClick}>
          Logout
        </Button>
      </div>
    </header>
  );
}
