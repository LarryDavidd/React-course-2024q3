import { RouterProvider } from 'react-router-dom';
import router from './router/routes';
import { MainHeader } from '@widgets/MainHeader';
import { DataProvider } from '@entities/Cards';

const App = () => {
  return (
    <DataProvider>
      <MainHeader />
      <RouterProvider router={router} />
    </DataProvider>
  );
};

export default App;
