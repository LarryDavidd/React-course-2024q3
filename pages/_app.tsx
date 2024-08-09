import type { AppProps } from 'next/app';

import ErrorBoundary from '@/components/shared/components/ErrorBoundary';
import Providers from '@/components/app/store/Provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </ErrorBoundary>
  );
}
