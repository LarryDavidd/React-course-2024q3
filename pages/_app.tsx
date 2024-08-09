import type { AppProps } from 'next/app';
import '@app/styles/tailwind.scss';

import ErrorBoundary from '@shared/components/ErrorBoundary';
import Providers from '@app/store/Provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </ErrorBoundary>
  );
}
