import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Footer from "../components/Footer";
import MetaTags from "../components/MetaTags";
import { useRouter } from "next/router";

export default function NetWorth() {
  const router = useRouter();
  const { type } = router.query;
  const [networth, setNetWorth] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setNetWorth(null);
      const request = await fetch(`/api/networth?type=${type}`);
      const data = await request.json();
      setNetWorth(data.rows);
    };
    fetchData();
  }, [type]);
  return (
    <div className={styles.container}>
      <MetaTags
        title="Celsius Net Worth - Easily look up coin transactions from Celsius
          bankruptcy proceedings"
        canonical="https://celsiustransactions.com/data"
        og="https://celsiustransactions.com/og2.png"
        cardTitle="Celsius Net Worth"
      />

      <main className={styles.main}>
        <Link href="/networth">
          <h1 className={styles.title}>Celsius Net Worth</h1>
        </Link>
        <Link href="/networth?type=individual">Individual</Link>
        <Link href="/networth?type=entity">Legal entity</Link>
        <Link href="/networth?type=both">Both</Link>
        <pre>{JSON.stringify(networth, null, 2)}</pre>
      </main>

      <Footer hideLink="dataset" />
    </div>
  );
}
