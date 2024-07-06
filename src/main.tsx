import ReactDOM from 'react-dom/client';

import App from '@app/App.tsx';

import '@app/styles/tailwind.scss';

import ErrorBoundary from '@shared/components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
