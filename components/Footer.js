import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Footer() {
  return (
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
        | <Link href="/data">Dataset</Link>
        | <Link href="/">Search</Link>
      </div>
      <div className={styles.small}>
        <p>
          This website indexes transactions in the table &quot;Coin
          Transactions&quot; for the &quot;SOFA Question 3: Certain payments or
          transfers to creditors within 90 days before filing this case&quot;.{" "}
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
  );
}
