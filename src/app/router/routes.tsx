import { NotFoundPage } from '@pages/NotFoundPage';
import { MainPage } from '@pages/MainPage';
import { createBrowserRouter } from 'react-router-dom';
import { ReactHookForm } from '@pages/ReactHookForms';
import UncontrolledForm from '@/pages/UncontrolledForm/ui/UncontrolledForm';

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
    path: 'simple-form',
    element: <UncontrolledForm />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

export default router;
