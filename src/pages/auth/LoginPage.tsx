import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from './service';
import { useAuth } from './context';
import Button from '../../components/shared/Button';
import FormField from '../../components/shared/FormField';
import { isApiClientError } from '../../api/client';
import { ApiClientError } from '../../api/error';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<ApiClientError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { onLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await login({ email, password }, rememberMe);

      console.log(response);
      onLogin();

      const to = location.state?.from ?? '/';
      navigate(to, { replace: true });
    } catch (error) {
      if (isApiClientError(error)) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = !email || !password || isLoading;

  return (
    <div className="loginPage">
      <h1>Log in to WallaPeach!</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="email"
          label="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <FormField
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
        />

        <div className="remember-me">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          <label htmlFor="remember-me">Remember me!</label>
        </div>

        <Button type="submit" $variant="primary" disabled={isDisabled} className="loginForm-submit"> Log in </Button>

        {error && (
          <div className="loginPage-error" onClick={() => setError(null)}>
            {error.message}
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginPage;
