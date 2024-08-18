import { NotFoundPage } from '@pages/NotFoundPage';
import { MainPage } from '@pages/MainPage';
import { createBrowserRouter } from 'react-router-dom';
import { ReactHookForm } from '@pages/ReactHookForms';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: 'react-hook-form',
    element: <ReactHookForm />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

export default router;
