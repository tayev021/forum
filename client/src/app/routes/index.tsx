import { BrowserRouter, Route, Routes } from 'react-router';
import { AppLayout } from '../layouts/AppLayout';
import { SigninPage } from '../../pages/SigninPage';
import { SignupPage } from '../../pages/SignupPage';
import { PageNotFound } from '../../pages/PageNotFound';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<div>Home page</div>} />
          <Route path="signin" element={<SigninPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
