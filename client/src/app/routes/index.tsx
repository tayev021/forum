import { useUser } from '../../entities/user';
import { AppLoader } from '../../shared/ui/AppLoader';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AppLayout } from '../../shared/layouts/AppLayout';
import { NavBarWidget } from '../../widgets/NavBarWidget';
import { HomePage } from '../../pages/home/ui/HomePage';
import { SigninPage, SignupPage } from '../../pages/auth';
import { ProtectedRoute } from './ProtectedRoute';
import { AccountLayout } from '../../shared/layouts/AccountLayout';
import { AccountNavBarWidget } from '../../widgets/AccountNavBarWidget';
import { BioPage } from '../../pages/account';
import { ForumPage } from '../../pages/forum';
import { ThreadCreatePage, ThreadPage } from '../../pages/thread';
import { PageNotFound } from '../../pages/pageNotFound';

export function AppRouter() {
  const { initialized } = useUser();

  if (!initialized) return <AppLoader />;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout NavBar={NavBarWidget} />}>
          <Route index element={<HomePage />} />
          <Route path="auth">
            <Route path="signin" element={<SigninPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>
          <Route
            path="account"
            element={
              <ProtectedRoute>
                <AccountLayout NavBar={AccountNavBarWidget} />
              </ProtectedRoute>
            }
          >
            <Route index element={<BioPage />} />
            <Route path="threads" element={<div>Threads Page</div>} />
            <Route path="posts" element={<div>Posts Page</div>} />
            <Route path="settings" element={<div>Settings Page</div>} />
          </Route>
          <Route path="forums">
            <Route path=":forumId" element={<ForumPage />} />
          </Route>
          <Route path="threads">
            <Route
              path="create"
              element={
                <ProtectedRoute>
                  <ThreadCreatePage />
                </ProtectedRoute>
              }
            />
            <Route path=":threadId" element={<ThreadPage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
