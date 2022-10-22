import { useState, useEffect } from "react";
import Link from "next/link";
import homeStyles from "../../styles/Home.module.css";
import nwStyles from "../../styles/NetWorth.module.css";
import personStyles from "../../styles/Person.module.css";

import Footer from "../../components/Footer";
import MetaTags from "../../components/MetaTags";
import { useRouter } from "next/router";

export default function NetWorth() {
  const router = useRouter();
  const username = router.query.username;
  const [assets, setAssets] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch(`/api/person/${username}`);
      const data = await request.json();
      setAssets(data.assets);
    };
    if (username) {
      fetchData();
    }
  }, [username]);

  const total = assets
    ? assets.reduce((acc, asset) => {
        return acc + asset.usd;
      }, 0)
    : 0;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      <MetaTags
        title="Celsius Net Worth Leaderboard - Easily look up coin transactions from Celsius
        bankruptcy proceedings"
        canonical="https://celsiustransactions.com/networth"
        og="https://celsiustransactions.com/og3.png"
        cardTitle="Celsius Net Worth Leaderboard"
      />

      <main className={nwStyles.nwMain}>
        <h1 className={[homeStyles.title, personStyles.title].join(" ")}>
          {username} lost{" "}
          <span className={personStyles.lost}>{formatter.format(total)}</span>{" "}
          in Celsius
        </h1>

        <div className={nwStyles.nwContainer}>
          <table className={homeStyles.transactions}>
            <thead>
              <tr>
                <th>TOKEN</th>
                <th>CATEGORY</th>
                <th>AMOUNT</th>
                <th>VALUE</th>
              </tr>
            </thead>
            <tbody>
              {assets
                ? assets.map((asset, i) => (
                    <tr key={i}>
                      <td>{asset.token}</td>
                      <td>{asset.category}</td>
                      <td>{asset.quantity}</td>
                      <td>{formatter.format(asset.usd)}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
        <div className={personStyles.loadTransactions}>
          <Link href={`/search/${username}`}>Load transactions →</Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
