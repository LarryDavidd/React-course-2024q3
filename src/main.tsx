import ReactDOM from 'react-dom/client';

import App from '@app/App.tsx';

import '@app/styles/tailwind.scss';

import ErrorBoundary from '@shared/components/ErrorBoundary';
import { Provider } from 'react-redux';
import { setupStore } from './app/store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </ErrorBoundary>
);
