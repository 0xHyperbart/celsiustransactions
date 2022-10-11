import { useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Footer from "../components/Footer";
import MetaTags from "../components/MetaTags";

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
    <>
      <MetaTags
        title="Celsius Transactions - Easily look up coin transactions from Celsius
          bankruptcy proceedings"
        canonical="https://celsiustransactions.com"
        og="https://celsiustransactions.com/og.png"
        cardTitle="Celsius Transactions"
      />
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
                <tr key={i}>
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
                <Link href="/data">grepping locally</Link>.
              </p>
            )}
          </div>
        ) : null}
      </main>
      <Footer hideLink="search" />
    </>
  );
}
