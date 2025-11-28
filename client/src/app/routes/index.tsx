import { useUser } from '../../entities/user';
import { AppLoader } from '../../shared/ui/AppLoader';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AppLayout } from '../layouts/AppLayout';
import { HomePage } from '../../pages/HomePage/ui/HomePage';
import { SigninPage } from '../../pages/SigninPage';
import { SignupPage } from '../../pages/SignupPage';
import { ProtectedRoute } from './ProtectedRoute';
import { ForumPage } from '../../pages/ForumPage';
import { PageNotFound } from '../../pages/PageNotFound';

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
          <Route path="forums/:forumId" element={<ForumPage />} />
          <Route path="threads/:threadId" element={<div>Thread Page</div>} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
