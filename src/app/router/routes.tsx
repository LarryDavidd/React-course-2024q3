import { NotFoundPage } from '@/components/pages/NotFoundPage';
import { MainPage } from '@/components/pages/MainPage';
import { CardDetails } from '@/components/pages/CardDetails';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        path: ':id',
        element: <CardDetails />,
        errorElement: <NotFoundPage />
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

export default router;
