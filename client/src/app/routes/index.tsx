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
import {
  AccountBioPage,
  AccountPostsPage,
  AccountThreadsPage,
  AccountSubscriptionsPage,
  AccountNotificationsPage,
  AccountSettingsPage,
} from '../../pages/account';
import { AuthorProfilePage } from '../../pages/author';
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
            <Route index element={<AccountBioPage />} />
            <Route path="posts" element={<AccountPostsPage />} />
            <Route path="threads" element={<AccountThreadsPage />} />
            <Route
              path="subscriptions"
              element={<AccountSubscriptionsPage />}
            />
            <Route
              path="notifications"
              element={<AccountNotificationsPage />}
            />
            <Route path="settings" element={<AccountSettingsPage />} />
          </Route>
          <Route path="author">
            <Route path=":authorId/profile" element={<AuthorProfilePage />} />
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
