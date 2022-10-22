import { useState, useEffect } from "react";
import Link from "next/link";
import homeStyles from "../styles/Home.module.css";
import nwStyles from "../styles/NetWorth.module.css";
import Footer from "../components/Footer";
import MetaTags from "../components/MetaTags";

export default function NetWorth({ type }) {
  const [people, setPeople] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch(`/api/networth/${type}`);
      const data = await request.json();
      setPeople(data.people);
    };
    if (type) {
      fetchData();
    }
  }, [type]);
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
        <Link href="/networth">
          <h1 className={[homeStyles.title, nwStyles.title].join(" ")}>
            Celsius Net Worth Leaderboard
          </h1>
        </Link>
        <div className={nwStyles.switchesContainer}>
          <div className={nwStyles.switches}>
            {type === "individual" ? (
              <span>Individual</span>
            ) : (
              <Link href="/networth/individual">Individual</Link>
            )}{" "}
            |{" "}
            {type === "entity" ? (
              <span>Legal entity</span>
            ) : (
              <Link href="/networth/entity">Legal entity</Link>
            )}{" "}
            |{" "}
            {type === "both" ? (
              <span>Both</span>
            ) : (
              <Link href="/networth/both">Both</Link>
            )}
          </div>
        </div>

        <div className={nwStyles.nwContainer}>
          <table className={homeStyles.transactions}>
            <thead>
              <tr>
                <th className={nwStyles.columnNumber}>#</th>
                <th className={nwStyles.columnName}>NAME</th>
                <th className={nwStyles.columnLost}>LOST</th>
              </tr>
            </thead>
            <tbody>
              {people
                ? people.map((person, i) => (
                    <tr key={person.schedule}>
                      <td>{i + 1}</td>
                      <td>
                        <Link href={`/person/${person.name}`}>
                          {person.name}
                        </Link>
                      </td>
                      <td>{formatter.format(person.networth)}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </main>

      <Footer hideLink="networth" />
    </>
  );
}
