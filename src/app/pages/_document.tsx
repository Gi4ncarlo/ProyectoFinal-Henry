import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" /> {/* Esto hace referencia al favicon en la carpeta public */}
          <link href="https://fonts.googleapis.com/css2?family=Nunito&family=Lato&family=Roboto&family=Cinzel&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
