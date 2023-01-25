import Head from "next/head";
import Link from "next/link";
import util from "../../styles/util.module.css";
import Image from "next/image";
import Script from "next/script";

export default function Flo() {
  const numOfImg = 8;
  let images = [];
  for (var i = 1; i < numOfImg + 1; i++) {
    images.push(
      <img
        className={util.imageBg}
        src={"/project-page/flo/flo" + i + ".png"}
        width="100%"
        alt="project image"
      />
    );
  }
  return (
    <>
      <Head>
        <title>Flo Recruit</title>
        <meta
          name="description"
          content="I spent 8 months freelancing for the legal recruiting platform. I worked on the dashboard for employer and school platform. I also designed and built the marketing website and a CMS driven blog."
        />
        <link rel="icon" href="icon.png" />{" "}
        <meta property="og:image" content="https://www.sj.land/og/index.png" />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-T2CWC86NTK"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>

      <main className={util.page}>
        <div className={util.projectColumn}>
          <div className={util.projectTopContainer}>
            <div className={util.projectTopLeft}>
              <h1 className={util.projectHeader}>Flo Recruit</h1>
              <p className={util.description}>
                I spent 8 months freelancing for the legal recruiting platform.
                I worked on the dashboard for employer and school platform. I
                also designed and built the marketing website and a CMS driven
                blog.
              </p>
            </div>

            <p className={util.projectDate}>Sep 2019 – Apr 2020</p>
          </div>
          {images}
          <Link scroll={false} href="/projects">
            <a className={util.backButton}> ← &nbsp; Other Projects</a>
          </Link>
        </div>
      </main>
    </>
  );
}
