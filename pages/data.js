import Link from "next/link";
import styles from "../styles/Home.module.css";
import Footer from "../components/Footer";
import MetaTags from "../components/MetaTags";

function DownloadsTable({ files }) {
  return (
    <table style={{ maxWidth: "400px" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => (
          <tr key={file.url}>
            <td>
              <a rel="noopener noreferrer" href={file.url}>
                {file.url.split("/").reverse()[0]}
              </a>
            </td>
            <td>{file.size}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

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
          <DownloadsTable
            files={[
              {
                url: "https://f004.backblazeb2.com/file/celsiustransactions/celsiustransactions.csv.tar.bz2",
                size: "39.5 MB",
              },
              {
                url: "https://f004.backblazeb2.com/file/celsiustransactions/celsiustransactions.csv.zip",
                size: "54.4 MB",
              },
              {
                url: "https://f004.backblazeb2.com/file/celsiustransactions/celsiustransactions.json.tar.bz2",
                size: "40.1 MB",
              },
              {
                url: "https://f004.backblazeb2.com/file/celsiustransactions/celsiustransactions.json.zip",
                size: "60.8 MB",
              },
              {
                url: "https://f004.backblazeb2.com/file/celsiustransactions/celsiustransactions.sqlite3.tar.bz2",
                size: "61.8 MB",
              },
              {
                url: "https://f004.backblazeb2.com/file/celsiustransactions/celsiustransactions.sqlite3.zip",
                size: "86.6 MB",
              },
            ]}
          />
        </div>
        <div className={styles.small}>
          Alternatively, if you just want to search transactions, you can use{" "}
          <Link href="/">celsiustransactions.com</Link>
        </div>
      </main>

      <Footer hideLink="dataset" />
    </div>
  );
}
