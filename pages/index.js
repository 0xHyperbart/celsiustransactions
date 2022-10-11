import { useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Footer from "../components/Footer";
import MetaTags from "../components/MetaTags";
import { useRouter } from "next/router";

// TODO: pagination
export default function Home() {
  const [queryInput, setQueryInput] = useState("");
  const router = useRouter();
  const loading = false;
  const txs = null;
  const totalCount = 0;
  const showingCount = 0;
  function submit(e) {
    e.preventDefault();
    router.push(`/search/${queryInput}`);
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
        <Link href="/">
          <h1 className={styles.title}>Search Celsius Transactions</h1>
        </Link>

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
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
          />
          <button className={styles.searchbtn} disabled={loading}>
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
