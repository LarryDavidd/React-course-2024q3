import { RouterProvider } from 'react-router-dom';
import router from './router/routes';
import { ThemeProvider } from '@/shared/context/themeProvider';

const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
