import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  /* */
  const [data, setData] = useState();
  useEffect(() => {
    fetch("https://test.spaceflightnewsapi.net/api/v2/articles", {
      method: "GET",
    }).then(async (resp) => {
      const datos = await resp.json();
      console.log("Data:", datos);
      setData(datos);
    });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title> Spaceflight News </title> <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://spaceflightnewsapi.net"> Spaceflight News! </a>{" "}
        </h1>

        <div className={styles.grid}>
          {data &&
            data.map((result, i) => {
              i++;
              let summa = result.summary;
              summa = summa.split(" ");
              let summary = "";
              for(let i=0; i<=21;i++){
                summary += " "+ summa[i]
              }
              console.log(summa);
              return (
                <a
                  key={i}
                  href={result.url}
                  className={styles.card}
                  target="blank"
                >
                  <img id="imgUrl" src={result.imageUrl}></img>
                  <h3>
                    {i} {result.title}{" "}
                  </h3>
                  <p className="descr">{summary}...</p>
                </a>
              );
            })}
        </div>
      </main>
      <footer className={styles.footer}>
        <p>
        Powered by
          <strong> Michael Figueroa</strong> {" "}
        </p>
        
      </footer>{" "}
    </div>
  );
}
