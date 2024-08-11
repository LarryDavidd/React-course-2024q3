import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import ThemeContainer from './components/shared/context/ThemeProvider';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { Provider } from 'react-redux';
import { setupStore } from './components/app/store/store';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Provider store={setupStore()}>
      <ThemeContainer>
        <Outlet />
      </ThemeContainer>
    </Provider>
  );
}

export function ErrorBoundary() {
  return <NotFoundPage />;
}
