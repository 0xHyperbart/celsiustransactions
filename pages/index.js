import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Script from "next/script";

// TODO: pagination
// TODO: shareable links
export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [txs, setTxs] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [showingCount, setShowingCount] = useState(0);
  function clear() {
    setQuery("");
    setTxs(null);
    setTotalCount(0);
    setShowingCount(0);
  }
  function submit(e) {
    e.preventDefault();
    setLoading(true);

    fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({
        query,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          throw new Error(data.error);
        }
        if (data.version !== "v1") {
          throw new Error("Please refresh the page");
        }
        console.log("data", data);
        setTxs(data.txs);
        setTotalCount(data.totalCount || 0);
        setShowingCount(data.showingCount || 0);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert(`Oopsie daisy. ${err.message}.`);
      });
  }
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
          bankruptcy proceedings.
        </title>
        <meta
          name="description"
          content="Easily look up coin transactions from Celsius bankruptcy proceedings."
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
        <meta property="og:url" content="https://celsiustransactions.com" />
        <meta property="og:title" content="Celsius Transactions" />
        <meta
          property="og:description"
          content="Easily look up coin transactions from Celsius bankruptcy proceedings."
        />
        <meta
          property="og:image"
          content="https://celsiustransactions.com/og.png"
        />
        <meta property="og:image:width" content="2400" />
        <meta property="og:image:height" content="1200" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://celsiustransactions.com"
        />
        <meta property="twitter:title" content="Celsius Transactions" />
        <meta
          property="twitter:description"
          content="Easily look up coin transactions from Celsius bankruptcy proceedings."
        />
        <meta
          property="twitter:image"
          content="https://celsiustransactions.com/og.png"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title} onClick={clear}>
          Search Celsius Transactions
        </h1>

        <p className={styles.description}>
          Easily look up coin transactions from{" "}
          <a
            href="https://gizmodo.com/celsius-execs-cashed-out-bitcoin-price-crypto-ponzi-1849623526"
            rel="noopener noreferrer"
          >
            Celsius bankruptcy proceedings
          </a>
          .
        </p>

        <form className={styles.description} onSubmit={submit}>
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
        </form>

        {txs !== null ? (
          <table className={styles.transactions}>
            <thead>
              <tr>
                <th>USERNAME</th>
                <th>ADDRESS</th>
                <th>DATE</th>
                <th>ACCOUNT</th>
                <th>TYPE</th>
                <th>Descriptive Purpose</th>
                <th>COIN</th>
                <th>COIN QUANTITY</th>
                <th>COIN USD</th>
              </tr>
            </thead>
            <tbody>
              {txs.map((tx, i) => (
                <tr key={i} className={styles.transaction}>
                  <td dangerouslySetInnerHTML={{ __html: tx[0] }}></td>
                  <td dangerouslySetInnerHTML={{ __html: tx[1] }}></td>
                  <td dangerouslySetInnerHTML={{ __html: tx[2] }}></td>
                  <td dangerouslySetInnerHTML={{ __html: tx[3] }}></td>
                  <td dangerouslySetInnerHTML={{ __html: tx[4] }}></td>
                  <td dangerouslySetInnerHTML={{ __html: tx[5] }}></td>
                  <td dangerouslySetInnerHTML={{ __html: tx[6] }}></td>
                  <td dangerouslySetInnerHTML={{ __html: tx[7] }}></td>
                  <td dangerouslySetInnerHTML={{ __html: tx[8] }}></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        {txs !== null ? (
          <div className={styles.gutter}>
            <p>
              Showing {showingCount} out of {totalCount}
            </p>
            {totalCount > showingCount && (
              <p>
                No pagination yet, to see more results try{" "}
                <a
                  href="https://github.com/0xHyperbart/celsiustransactions"
                  rel="noopener noreferrer"
                >
                  grepping locally
                </a>{" "}
                (instructions WIP)
              </p>
            )}
          </div>
        ) : null}
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
          |
          <a
            href="https://f004.backblazeb2.com/file/celsiustransactions/celsiustransactions.sqlite3.tar.bz2"
            rel="noopener noreferrer"
          >
            Dataset (SQLite)
          </a>
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
