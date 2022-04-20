import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import util from "../styles/util.module.css";
import Link from "next/link";
import PodcastTile from "../components/podcastTile";

export default function Podcasts() {
  return (
    <>
      <Head>
        <title>SJs Favorite Podcasts</title>
        <meta name="description" content="What I listening to when I commute" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={util.page}>
        <div className={util.pageColumn}>
          <h1 className={util.header}>Podcasts</h1>
          <p className={util.description}>What I listening to when I commute</p>
          <ul className={util.grid}>
            <PodcastTile
              image="snacks"
              title="Robinhood Snacks"
              content="If you are a founder, pitch to me!"
              url="https://robinhood.com"
            />
          </ul>
        </div>
      </main>
    </>
  );
}
