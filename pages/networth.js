import { useState, useEffect } from "react";
import Link from "next/link";
import homeStyles from "../styles/Home.module.css";
import nwStyles from "../styles/NetWorth.module.css";
import Footer from "../components/Footer";
import MetaTags from "../components/MetaTags";
import { useRouter } from "next/router";

export default function NetWorth() {
  const router = useRouter();
  const type = router.query.type || "individual";
  const [people, setPeople] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const request = await fetch(`/api/networth?type=${type}`);
      const data = await request.json();
      setPeople(data.people);
    };
    fetchData();
  }, [type]);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      <MetaTags
        title="Celsius Net Worth - Easily look up coin transactions from Celsius
          bankruptcy proceedings"
        canonical="https://celsiustransactions.com/networth"
        og="https://celsiustransactions.com/og3.png"
        cardTitle="Celsius Net Worth"
      />

      <main className={nwStyles.nwMain}>
        <Link href="/networth">
          <h1 className={[homeStyles.title, nwStyles.title].join(" ")}>
            Celsius Net Worth
          </h1>
        </Link>
        <div className={nwStyles.switchesContainer}>
          <div className={nwStyles.switches}>
            {type === "individual" ? (
              <span>Individual</span>
            ) : (
              <Link href="/networth?type=individual">Individual</Link>
            )}{" "}
            |{" "}
            {type === "entity" ? (
              <span>Legal entity</span>
            ) : (
              <Link href="/networth?type=entity">Legal entity</Link>
            )}{" "}
            |{" "}
            {type === "both" ? (
              <span>Both</span>
            ) : (
              <Link href="/networth?type=both">Both</Link>
            )}
          </div>
        </div>

        <div className={nwStyles.networth}>
          <table className={homeStyles.transactions}>
            <thead>
              <tr>
                <th>#</th>
                <th>NAME</th>
                <th>LOST</th>
              </tr>
            </thead>
            <tbody>
              {people
                ? people.map((person, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{person.name}</td>
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
