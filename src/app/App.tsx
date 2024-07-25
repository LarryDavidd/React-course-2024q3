import { RouterProvider } from 'react-router-dom';
import router from './router/routes';
import { DataProvider } from '@entities/Cards';

const App = () => {
  return (
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  );
};

export default App;
