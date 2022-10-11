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
          <button className={styles.searchbtn}>Search</button>
        </form>
        <p className={styles.small}>
          Or check out the <Link href="/networth">Net Worth Leaderboard</Link>.
        </p>
      </main>
      <Footer hideLink="search" />
    </>
  );
}
