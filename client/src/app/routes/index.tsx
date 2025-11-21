import { useUser } from '../../entities/user';
import { AppLoader } from '../../shared/ui/AppLoader';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AppLayout } from '../layouts/AppLayout';
import { HomePage } from '../../pages/HomePage/ui/HomePage';
import { SigninPage } from '../../pages/SigninPage';
import { SignupPage } from '../../pages/SignupPage';
import { PageNotFound } from '../../pages/PageNotFound';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRouter() {
  const { initialized } = useUser();

  if (!initialized) return <AppLoader />;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route
            path="account"
            element={
              <ProtectedRoute>
                <div>Account</div>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
