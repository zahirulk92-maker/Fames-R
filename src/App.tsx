import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ToastProvider, RootErrorBoundary } from './components/ui';

export default function App() {
  return (
    <RootErrorBoundary>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </RootErrorBoundary>
  );
}
