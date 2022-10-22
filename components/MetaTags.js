import Script from "next/script";
import Head from "next/head";
export default function MetaTags(props) {
  const title = props.title;
  const canonical = props.canonical;
  const og = props.og;
  const cardTitle = props.cardTitle;
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-8F2M52TY44"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
  
              gtag('config', 'G-8F2M52TY44');
          `,
        }}
      />
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Easily look up coin transactions from Celsius bankruptcy proceedings"
        />
        <meta
          name="keywords"
          content="Celsius transactions dataset, leaked Celsius transactions, Celsius coin transactions, SOFA Question 3: Certain payments or transfers to creditors within 90 days before filing this case, Celsius net worth"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#c99616" />
        <meta name="msapplication-TileColor" content="#fdb500" />
        <meta name="theme-color" content="#fdb500" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={cardTitle} />
        <meta
          property="og:description"
          content="Easily look up coin transactions from Celsius bankruptcy proceedings"
        />
        <meta property="og:image" content={og} />
        <meta property="og:image:width" content="2400" />
        <meta property="og:image:height" content="1200" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonical} />
        <meta property="twitter:title" content={cardTitle} />
        <meta
          property="twitter:description"
          content="Easily look up coin transactions from Celsius bankruptcy proceedings"
        />
        <meta property="twitter:image" content={og} />
      </Head>
    </>
  );
}
