import { NotFoundPage } from '@pages/NotFoundPage';
import { MainPage } from '@pages/MainPage';
import { CardDetails } from '@pages/CardDetails';
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
