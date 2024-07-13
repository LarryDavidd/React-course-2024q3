import { NotFoundPage } from '@pages/NotFoundPage';
import { MainPage } from '@pages/MainPage';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

export default router;
