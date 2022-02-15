import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hello World!
        </h1>

        <p className={styles.description}>
          이것저것 Next.js 앱 만들기
        </p>

        <div className={styles.grid}>
          <Link href="/games/worldcup">
            <a className={styles.card}>
              <h2>토너먼트 &rarr;</h2>
              <p>이상형 월드컵같은 토너먼트 선택지.</p>
            </a>
          </Link>

        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          Created by <span>Dal-ya</span>
        </p>
      </footer>
    </div>
  );
}
