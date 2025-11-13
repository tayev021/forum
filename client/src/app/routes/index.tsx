import { BrowserRouter, Route, Routes } from 'react-router';
import { AppLayout } from '../layouts/AppLayout';
import { SignupPage } from '../../pages/SignupPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<div>Home page</div>} />
          <Route path="signin" element={<div>sign in</div>} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="*" element={<div>PageNotFound</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
