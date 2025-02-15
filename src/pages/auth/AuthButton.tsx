import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/shared/Button";
import { useAuth } from "../../pages/auth/context";
import { logout } from "../../pages/auth/service";
import DeleteConfirmation from "../../components/shared/DeleteConfirmation";

export default function AuthButton() {
  const { isLogged, onLogout } = useAuth();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogoutClick = () => setShowConfirmation(true);

  const handleConfirmLogout = async () => {
    setLoading(true);
    await logout();
    onLogout();
    setLoading(false);
    setShowConfirmation(false);
  };

  const handleCancelLogout = () => setShowConfirmation(false);

  return isLogged ? (
    <>
      <Button onClick={handleLogoutClick} $variant="secondary">
        Logout
      </Button>
      {showConfirmation && (
        <DeleteConfirmation
          message="Do you really wanna logout?"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
          loading={loading}
        />
      )}
    </>
  ) : (
    <Link to="/login">
      <Button $variant="primary">Login</Button>
    </Link>
  );
}