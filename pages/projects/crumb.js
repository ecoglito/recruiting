import Head from "next/head";
import Link from "next/link";
import util from "../../styles/util.module.css";
import Image from "next/image";
import Script from "next/script";

export default function Oriant() {
  const numOfImg = 1;
  let images = [];
  for (var i = 1; i < numOfImg + 1; i++) {
    images.push(
      <img
        className={util.imageBg}
        src={"/project-page/crumb/crumb" + i + ".png"}
        width="100%"
        alt="project image"
      />
    );
  }
  return (
    <>
      <Head>
        <title>Crumb</title>
        <meta
          name="description"
          content="I started working with Crumb to come up with a few website designs. I ended up implementing a different design for them."
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
              <h1 className={util.projectHeader}>Crumb</h1>
              <p className={util.description}>
                I started working with Crumb to come up with a few website
                designs. I ended up implementing a different design for them.
              </p>
            </div>

            <p className={util.projectDate}>Dec 2019</p>
          </div>
          {images}
          <video className={util.imageBg} width="100%" autoPlay loop muted>
            <source
              src="https://dl.dropbox.com/s/2o5bz8bdxuzzu96/Crumb%20Film.mp4?dl=0"
              type="video/mp4"
            />
          </video>
          <Link scroll={false} href="/projects">
            <a className={util.backButton}> ← &nbsp; Other Projects</a>
          </Link>
        </div>
      </main>
    </>
  );
}
