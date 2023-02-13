import Head from "next/head";
import Link from "next/link";
import util from "../../styles/util.module.css";
import Image from "next/image";
import Script from "next/script";

export default function Oriant() {
  const numOfImg = 10;
  let images = [];
  for (var i = 1; i < numOfImg + 1; i++) {
    images.push(
      <img
        className={util.imageBg}
        src={"/project-page/oriant/oriant" + i + ".png"}
        width="100%"
        alt="project image"
      />
    );
  }
  return (
    <>
      <Head>
        <title>Oriant</title>
        <meta
          name="description"
          content="A design exercise to encourage students exploring orientation events and manage their orientation schedules. It was a 5 day project that I covered from research to prototyping."
        />
        <link rel="icon" href="icon.png" />{" "}
        <meta property="og:image" content="https://imgur.com/a/al1McI2" />
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
              <h1 className={util.projectHeader}>Oriant</h1>
              {/* <div className={util.inset}> */}
              <p className={util.description}>
                A design exercise to encourage students exploring orientation
                events and manage their orientation schedules. It was a 5 day
                project that I covered from research to prototyping.
              </p>
              {/* </div> */}
            </div>

            <p className={util.projectDate}>Feb 2019</p>
          </div>
          <iframe
            className={util.video}
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/eZGhdayv6r8"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          {images}
          <Link scroll={true} href="/projects">
            <a className={util.backButton}> ← &nbsp; Other Projects</a>
          </Link>
        </div>
      </main>
    </>
  );
}
