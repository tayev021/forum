import { Toaster as ReactHotToaster } from 'react-hot-toast';

export function Toaster() {
  return (
    <ReactHotToaster
      position="bottom-right"
      gutter={5}
      toasterId="default"
      toastOptions={{
        style: {
          maxWidth: '25rem',
          padding: '0.8rem 1.2rem',
        },

        success: {
          duration: 3000,
          style: {
            color: 'var(--color-primary)',
            background: 'var(--color-bg-secondary)',
          },
        },

        error: {
          duration: 5000,
          style: {
            color: 'var(--color-rose-600)',
            background: 'var(--color-bg-secondary)',
          },
        },
      }}
    />
  );
}
