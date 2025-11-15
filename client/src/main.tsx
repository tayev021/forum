import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './app/store/index.ts';
import { me } from './entities/user/model/thunks/me.ts';
import { App } from './app/App.tsx';

async function init() {
  await store.dispatch(me());
}

init().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
