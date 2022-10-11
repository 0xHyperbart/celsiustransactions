import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Script from "next/script";

// TODO: pagination
// TODO: shareable links
export default function Home() {
  return (
    <div className={styles.container}>
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
        <title>
          Celsius Transactions - Easily look up coin transactions from Celsius
          bankruptcy proceedings - Dataset
        </title>
        <meta
          name="description"
          content="Easily look up coin transactions from Celsius bankruptcy proceedings"
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
        <meta property="og:url" content="https://celsiustransactions.com/data" />
        <meta property="og:title" content="Celsius Transactions Dataset" />
        <meta
          property="og:description"
          content="Easily look up coin transactions from Celsius bankruptcy proceedings"
        />
        <meta
          property="og:image"
          content="https://celsiustransactions.com/og2.png"
        />
        <meta property="og:image:width" content="2400" />
        <meta property="og:image:height" content="1200" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://celsiustransactions.com/data"
        />
        <meta property="twitter:title" content="Celsius Transactions Dataset" />
        <meta
          property="twitter:description"
          content="Easily look up coin transactions from Celsius bankruptcy proceedings"
        />
        <meta
          property="twitter:image"
          content="https://celsiustransactions.com/og2.png"
        />
      </Head>

      <main className={styles.main}>
        <Link href="/data">
          <h1 className={styles.title}>Celsius Transactions Dataset</h1>
        </Link>

        <p className={styles.description}>
          Download dataset of Celsius Coin Transactions:
        </p>
        <div style={{ display: "flex", justifyContent: "center", margin: '0 0 4rem 0' }}>
          <table style={{ maxWidth: "400px" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a
                    rel="noopener noreferrer"
                    href="https://f004.backblazeb2.com/file/celsiustransactions/celsiustransactions.csv.tar.bz2"
                  >
                    celsiustransactions.csv.tar.bz2
                  </a>
                </td>
                <td>39.5 MB</td>
              </tr>
              <tr>
                <td>
                  <a
                    rel="noopener noreferrer"
                    href="https://f004.backblazeb2.com/file/celsiustransactions/celsiustransactions.csv.zip"
                  >
                    celsiustransactions.csv.zip
                  </a>
                </td>
                <td>54.4 MB</td>
              </tr>
              <tr>
                <td>
                  <a
                    rel="noopener noreferrer"
                    href="https://f004.backblazeb2.com/file/celsiustransactions/celsiustransactions.json.tar.bz2"
                  >
                    celsiustransactions.json.tar.bz2
                  </a>
                </td>
                <td>40.1 MB</td>
              </tr>
              <tr>
                <td>
                  <a
                    rel="noopener noreferrer"
                    href="https://f004.backblazeb2.com/file/celsiustransactions/celsiustransactions.json.zip"
                  >
                    celsiustransactions.json.zip
                  </a>
                </td>
                <td>60.8 MB</td>
              </tr>
              <tr>
                <td>
                  <a
                    rel="noopener noreferrer"
                    href="https://f004.backblazeb2.com/file/celsiustransactions/celsiustransactions.sqlite3.tar.bz2"
                  >
                    celsiustransactions.sqlite3.tar.bz2
                  </a>
                </td>
                <td>61.8 MB</td>
              </tr>
              <tr>
                <td>
                  <a
                    rel="noopener noreferrer"
                    href="https://f004.backblazeb2.com/file/celsiustransactions/celsiustransactions.sqlite3.zip"
                  >
                    celsiustransactions.sqlite3.zip
                  </a>
                </td>
                <td>86.6 MB</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.small}>
          Alternatively, if you just want to search transactions, you can use{" "}
          <Link href="/">celsiustransactions.com</Link>
        </div>

        {/* <form className={styles.description} onSubmit={submit}>
          <input
            className={styles.inputbox}
            name="q"
            type="search"
            placeholder="Username or address"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={styles.searchButton} disabled={loading}>
            {loading ? "Searching" : "Search"}
          </button>
        </form> */}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="https://twitter.com/0xHyperbart" rel="noopener noreferrer">
            Twitter
          </a>{" "}
          |
          <a
            href="https://github.com/0xHyperbart/celsiustransactions"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          | <Link href="/">Search</Link>
        </div>
        <div className={styles.small}>
          <p>
            This website indexes transactions in the table &quot;Coin
            Transactions&quot; for the &quot;SOFA Question 3: Certain payments
            or transfers to creditors within 90 days before filing this
            case&quot;.{" "}
          </p>
          <p>
            The list of transactions doesn&apos;t include Mashinsky&apos;s
            personal transactions.
          </p>
        </div>
        <div className={styles.small}>
          Best experienced on Desktop. More features coming soon &mdash; watch
          this space.
        </div>
      </footer>
    </div>
  );
}
