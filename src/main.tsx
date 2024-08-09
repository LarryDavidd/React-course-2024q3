import ReactDOM from 'react-dom/client';

import App from '@/components/app/App.tsx';

import '@/components/app/styles/tailwind.scss';

import ErrorBoundary from '@/components/shared/components/ErrorBoundary';
import { Provider } from 'react-redux';
import { setupStore } from './app/store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </ErrorBoundary>
);
