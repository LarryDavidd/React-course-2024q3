import { Html, Head, Main, NextScript } from 'next/document';

function Document() {
  return (
    <Html
      className="dark"
      data-theme="dark"
    >
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
