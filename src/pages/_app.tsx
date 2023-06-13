import AppContextProvider from "@/contexts";
import AppConfigHeader from "@/rootConfigs/AppConfigHeader";
import AppProvider from "@/rootConfigs/AppQueryProvider";
import { FontConfigProvider } from "@/rootConfigs/FontConfig";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <link rel="icon" href="/favicon.ico" />
        {/* <meta name="title" content={defaultContent.title} />
        <meta name="description" content={defaultContent.description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={defaultContent.siteUrl} />
        <meta property="og:title" content={defaultContent.title} />
        <meta property="og:description" content={defaultContent.description} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={defaultContent.siteUrl} />
        <meta property="twitter:title" content={defaultContent.title} />
        <meta
          property="twitter:description"
          content={defaultContent.description}
        />
        <meta property="twitter:image" content={DEFAULT_OG_IMAGE} /> */}
      </Head>
      <AppProvider>
        <>
          <AppContextProvider>
            <FontConfigProvider>
              <AppConfigHeader>
                <Component {...pageProps} />
              </AppConfigHeader>
            </FontConfigProvider>
          </AppContextProvider>
        </>
      </AppProvider>
      <Script
        strategy="afterInteractive"
        id="google-tag"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTAG}');
          `,
        }}
      />
    </>
  );
}
