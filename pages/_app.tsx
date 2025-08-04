import '../styles/globals.css'
import Head from "next/head";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>DevTools</title>
        <meta
          name="description"
          content="DevTools curates a comprehensive list of free and open-source tools to help you with your daily software needs."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://awesomedevtools.vercel.app" />
        <meta property="og:title" content="DevTools" />
        <meta
          property="og:description"
          content="DevTools curates a comprehensive list of free and open-source tools to help you with your daily software needs."
        />
        <meta
          property="og:image"
          content="https://awesomedevtools.vercel.app/preview-image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DevTools" />
        <meta
          name="twitter:description"
          content="DevTools curates a comprehensive list of free and open-source tools to help you with your daily software needs."
        />
        <meta
          name="twitter:image"
          content="https://awesomedevtools.vercel.app/preview-image.jpg"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

