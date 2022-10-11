import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Script from "next/script";
import Footer from "../components/Footer";
import MetaTags from "../components/MetaTags";

// TODO: pagination
// TODO: shareable links
export default function Home() {
  return (
    <div className={styles.container}>
      <MetaTags
        title="Celsius Transactions - Easily look up coin transactions from Celsius
          bankruptcy proceedings - Dataset"
        canonical="https://celsiustransactions.com/data"
        og="https://celsiustransactions.com/og2.png"
        cardTitle="Celsius Transactions Dataset"
      />

      <main className={styles.main}>
        <Link href="/data">
          <h1 className={styles.title}>Celsius Transactions Dataset</h1>
        </Link>

        <p className={styles.description}>
          Download dataset of Celsius Coin Transactions:
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "0 0 4rem 0",
          }}
        >
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
      </main>

      <Footer />
    </div>
  );
}
