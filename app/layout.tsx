import Providers from '@/components/app/store/Provider';
import type { Metadata } from 'next';
import '@app/styles/tailwind.scss';
import ThemeContainer from '@/components/shared/context/ThemeProvider';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js'
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeContainer>
          <Providers>{children}</Providers>
        </ThemeContainer>
      </body>
    </html>
  );
}
