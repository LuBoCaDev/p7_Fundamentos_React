import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import AdvertsPage from "./pages/adverts/AdvertsPage";
import AdvertPage from "./pages/adverts/AdvertPage";
import NewAdvertPage from "./pages/adverts/NewAdvertPage";
import LoginPage from "./pages/auth/LoginPage";
import RequireAuth from './pages/auth/RequireAuth';
import Layout from './components/layout/Layout';
import NotFoundPage from './components/errors/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/adverts"
        element={
          <RequireAuth>
            <Layout>
              <Outlet />
            </Layout>
          </RequireAuth>
        }
      >
        <Route index element={<AdvertsPage />} />
        <Route path=":id" element={<AdvertPage />} />
        <Route path="new" element={<NewAdvertPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/adverts" />} />

      <Route path="/404" element={<NotFoundPage />} />

      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
