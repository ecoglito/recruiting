import Head from "next/head";
import React, { useEffect } from "react";
import { useMediaQuery } from 'react-responsive';
import util from "../styles/util.module.css";
import Link from "next/link";
import Tile from "../components/tiles/homeVersions/tile";
import CompanyListTile from "../components/tiles/homeVersions/companyListTile";
import TalentListTile from "../components/tiles/homeVersions/talentListTile";
import GoodsTile from "../components/tiles/homeVersions/goodsTile";
import StoreTile from "../components/tiles/homeVersions/storeTile";
import styles from "../pages/index.module.css";
import toast, { Toaster } from "react-hot-toast";
import OnboardingCard from "../components/onboardingCard";
import { motion, AnimatePresence } from "framer-motion";
const { Client } = require("@notionhq/client");
import Script from "next/script";

export default function Home({ companyListList, talentListList }) {
  //create masterlist objects with uuid and text and cta
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const tips = [
    {
      id: "useShortCut",
      text: "Use keyboard shortcut 1 → 9 to navigate between pages. Try press 2, 3, 4, then 1 to come back here.",
      ctaText: null,
      ctaLink: null,
    },
    {
      id: "firstTime",
      text: "Want to learn more about why we made this?",
      ctaText: "More about Alchemy Connect →",
      ctaLink: "/about",
    },
    {
      id: "seeTalent",
      text: "Want to see our full list of talent?",
      ctaText: "Check out our list →",
      ctaLink: "/talent",
    },
    {
      id: "seeHowItWasBuilt",
      text: "Make sure to check out our other products!",
      ctaText: "Visit Alchemy",
      ctaLink: "alchemy.com",
    },
    {
      id: "web3Teams",
      text: "Want advice on building a rockstar web3 team?",
      ctaText: "See our guide here ↗",
      ctaLink: "https://cal.com/sjzhang/15min",
    },
  
  ];
  //create currentlist of what user need to see
  const [currentTips, setCurrentTips] = React.useState([0]);

  //on load, check masterlist with location storage,
  const [isVisible, setIsVisible] = React.useState(false);
  useEffect(() => {
    let newTips = tips;
    tips.forEach((tip) => {
      if (localStorage.getItem(tip.id)) {
        newTips = newTips.filter((e) => e.id != tip.id);
      }
    });
    //render currentlist
    setCurrentTips(newTips);
    //hide the tip section - framer motion depends on this
    newTips.length < 1 ? setIsVisible(false) : setIsVisible(true);
  }, []);



  const [userTime, setUserTime] = React.useState(null);

  //if all dismissed destroy the box with motion
  useEffect(() => {
    currentTips.length < 1 ? setIsVisible(false) : null;
  }, [currentTips]);

  //when user click on the x on onboarding cards
  //remove the card and write in local storage to not show again
  function handleOnboardingDismiss(e) {
    e.preventDefault();
    let element = e.target.parentElement;
    localStorage.setItem(element.id, true);
    let newTips = currentTips;
    newTips = newTips.filter((e) => e.id != element.id);
    //remove from current array to trigger a change
    setCurrentTips(newTips);
  }

  function resetOnboarding() {
    setCurrentTips(tips);
    tips.forEach((tip) => {
      localStorage.removeItem(tip.id);
    });
    setIsVisible(true);
  }

  useEffect(() => {
    let thisPage = document.querySelector("#recentsPage");
    let top = sessionStorage.getItem("recents-scroll");
    if (top !== null) {
      thisPage.scrollTop = top;
    }
    const handleScroll = () => {
      sessionStorage.setItem("recents-scroll", thisPage.scrollTop);
    };
    thisPage.addEventListener("scroll", handleScroll);
    return () => thisPage.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    var greeting =
      hour > 17
        ? "Good evening"
        : hour > 11
        ? "Good afternoon"
        : hour > 4
        ? "Good morning"
        : hour > 2
        ? "It's late, go to bed"
        : "Hello";
    setUserTime(greeting);
  }, []);

  const description =
    "Alchemy Connect is the best way to find talent in web3. We help you find the right people for your team, and help you get hired by the best companies in the space.";

  return (
    <>
      <Head>
        <title>Alchemy Connect | Home</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/icon.png" type="image/gif" />
        <meta property="og:image" content="https://www.sj.land/og/index.png" />
      </Head>{" "}
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
      <main className={util.page} id="recentsPage">
        <div className={styles.homeColumn}>
          <h1 className={styles.homeGreetingTitle}>
            {/* Welcome, <span className={util.gradient}>Paul.</span> */}
             Welcome, Nikil.
          </h1>
          <span className={styles.tinyText}>
            Explore a curated list of the best talent in the industry. {" "}
            {isVisible && !isMobile
              ? `Below are some tips to get you started on this website.`
              : null}
            {!isVisible ? (
              <span onClick={resetOnboarding} className={styles.reset}>
                Need a refresher? Reset onboarding.
              </span>
            ) : null}
          </span>
          <AnimatePresence mode={"sync"}>
            {isVisible && (
              <motion.div
                className={styles.introContainer}
                layout
                // transition={{ type: "spring" }}
                initial={{
                  opacity: 0,
                  height: 0,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                animate={{
                  opacity: 1,
                  height: 180,
                  transition: { delay: 0.25, duration: 0.4, ease: "easeInOut" },
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  transition: { duration: 0.6, ease: "easeInOut" },
                }}
              >
                <AnimatePresence mode={"popLayout"}>
                  {currentTips.map((tip) => (
                    <OnboardingCard
                      key={tip.id}
                      handleDismiss={handleOnboardingDismiss}
                      id={tip.id}
                      text={tip.text}
                      ctaText={tip.ctaText}
                      ctaLink={tip.ctaLink}
                      ref={React.createRef()}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className={styles.homeSectionContainer}>
            <h2 className={styles.homeSectionTitle}>Talent</h2>
            <Link href="/reading-list">
              <a className={styles.homeLinkButton}>View All</a>
            </Link>
          </div>{" "}
          <ul className = {styles.homeUpdatesGrid}>
            {talentListList.map((item) => (
              <Tile 
              key={item.id}
                internalUrl={item.properties.Path.plain_text}
                title={item.properties.Name.title[0].plain_text}
                content = {item.properties.Body.rich_text}
                experience = {item.properties.Experience.rich_text}
                education = {item.properties.Education.rich_text}
                url={item.properties.URL.url}
                date={item.created_time}
                tags={item.properties.Tags.multi_select}
              />
        
            ))}
          </ul>

          <div className={styles.homeSectionContainer}>
            <h2 className={styles.homeSectionTitle}>Companies</h2>
            <Link href="/reading-list">
              <a className={styles.homeLinkButton}>View All</a>
            </Link>
          </div>{" "}
          <ul className={styles.homeReadingGrid}>
            {companyListList.map((link) => (
              <CompanyListTile
                key={link.id}
                title={link.properties.Name.title[0].plain_text}
                url={link.properties.URL.url}
                date={link.created_time}
                content = {link.properties.Body.rich_text}
                tags={link.properties.Tags.multi_select}
              />
            ))}
          </ul>
        </div>

      </main>
    </>
  );
}

//notion API
export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const companyListResponse = await notion.databases.query({
    database_id: process.env.NOTION_COMPANYLIST_ID,
    filter: {
      and: [
        {
          property: "Display",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: "Created",
        direction: "descending",
      },
    ],
    page_size: 8,
  });
  const talentListResponse = await notion.databases.query({
    database_id: process.env.NOTION_TALENTLIST_ID,
    filter: {
      and: [
        {
          property: "Display",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: "Created",
        direction: "descending",
      },
    ],
  });

  return {
    props: {
      companyListList: companyListResponse.results,
      talentListList: talentListResponse.results,
    },
    revalidate: 5,
  };
}
