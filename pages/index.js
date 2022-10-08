import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const [transactions, setTransactions] = useState([]);
  function submit(e) {
    e.preventDefault();

    fetch("/api/hello", {
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
        if (data.success) {
          console.log("data", data);
          setTransactions(data.transactions);
        } else {
          alert(
            "Oopsie daisy, the API isn't working right now. Try again later."
          );
        }
      });
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Search Celsius Transactions</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Search Celsius Transactions</h1>

        <p className={styles.description}>
          Easily look up transactions from{" "}
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
            size={40}
          />
          <button className={styles.searchButton}>Search</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, i) => (
              <tr key={i} className={styles.transaction}>
                <td className={styles.username}>
                  <div
                    dangerouslySetInnerHTML={{ __html: transaction.username }}
                  />
                </td>
                <td className={styles.address}>
                  <div
                    dangerouslySetInnerHTML={{ __html: transaction.address }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <footer className={styles.footer}>
        <a href="https://twitter.com/0xHyperbart" rel="noopener noreferrer">
          Twitter: 0xHyperbart
        </a>
        <div class={styles.small}>
          More features coming soon &mdash; watch this space.
        </div>
      </footer>
    </div>
  );
}
