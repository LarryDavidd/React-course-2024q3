import type { AppProps } from 'next/app';
import '@/components/app/styles/tailwind.scss';

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
