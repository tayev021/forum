import { useUser } from '../../entities/user';
import { AppLoader } from '../../shared/ui/AppLoader';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AppLayout } from '../../shared/layouts/AppLayout';
import { NavBarWidget } from '../../widgets/NavBarWidget';
import { HomePage } from '../../pages/HomePage/ui/HomePage';
import { SigninPage } from '../../pages/SigninPage';
import { SignupPage } from '../../pages/SignupPage';
import { ProtectedRoute } from './ProtectedRoute';
import { ForumPage } from '../../pages/ForumPage';
import { ThreadCreatePage } from '../../pages/ThreadCreatePage';
import { ThreadPage } from '../../pages/ThreadPage';
import { PageNotFound } from '../../pages/PageNotFound';

export function AppRouter() {
  const { initialized } = useUser();

  if (!initialized) return <AppLoader />;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout NavBar={NavBarWidget} />}>
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
          <Route
            path="forums/:forumId/createThread"
            element={
              <ProtectedRoute>
                <ThreadCreatePage />
              </ProtectedRoute>
            }
          />
          <Route path="threads/:threadId" element={<ThreadPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
