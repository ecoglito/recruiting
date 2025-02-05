import Head from "next/head";
import React, { useEffect, useContext } from "react";
import { useMediaQuery } from 'react-responsive';
import util from "../styles/util.module.css";
import Link from "next/link";
import CompanyListTile from "../components/tiles/homeVersions/companyListTile";
import InvestorListTile from "../components/tiles/homeVersions/investorListTile";
import FounderRequestTile from "../components/tiles/homeVersions/founderRequestTile";
import styles from "../pages/index.module.css";
import OnboardingCard from "../components/onboardingCard";
import { motion, AnimatePresence } from "framer-motion";
const { Client } = require("@notionhq/client");
import { useSession } from "next-auth/react";
import Image from "next/image";
import { GlobalStateContext } from "../GlobalState";


export default function Home({ portfolioListCompanies, investorListList, portfolioListList }) {

  const { data: session } = useSession();
  

  const { isPortfolioCompany, setIsPortfolioCompany } = useContext(GlobalStateContext);
  

  let email;

  function checkEmails(userEmail, portfolioListCompanies) {
    const userDomain = userEmail.split('@')[1];
    return portfolioListCompanies.some(link => {
      return userDomain === link.properties.Email.email.split('@')[1] || userDomain === 'alchemy.com' || userEmail === "lukasikdesign@gmail.com" || userEmail === "enzocogjk@gmail.com";
    });
  }

  if (session) {
    email = session.user.email;
    setIsPortfolioCompany(checkEmails(email, portfolioListCompanies));
    console.log(isPortfolioCompany);
  }
 


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

  const description =
    "Alchemy Connect is the best way to find talent in web3. We help you find the right people for your team, and help you get hired by the best companies in the space.";

  let firstName = "";
  if (session) {
    let name = session.user.name;
    firstName = name.split(" ")[0];
  }
  
    return (
    <>
      <Head>
        <title>Alchemy Connect | Home</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/icon.png" type="image/gif" />
        <meta property="og:image" content="https://imgur.com/a/al1McI2" />
      </Head>{" "}
    
      
      <main className={util.page} id="recentsPage">
        <div className={styles.homeColumn}>
          <h1 className={styles.homeGreetingTitle}>
             Welcome, {firstName}.
          </h1>
          <span className={styles.tinyText}>
            A platform for you to interact with our portfolio companies, investor network, and the Alchemy team. {" "}
          </span>
            {/* {isVisible && !isMobile
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
          </AnimatePresence> */}

          <div className={styles.firstHomeSection}>
            <h2 className={styles.homeSectionTitle}>Companies</h2>
            <Link href="/companies">
              <a className={styles.homeLinkButton}>View All</a>
            </Link>
          </div>{" "}
          <ul className={styles.homeReadingGrid}>
            {portfolioListList.map((link) => (
              <CompanyListTile
                key = {link.id}
                title={link.properties.Company.title[0].plain_text}
                tags={link.properties.Industry.multi_select}
                url = {link.properties.URL.url}
                about = {link.properties.About.rich_text}
                founder = {link.properties.Founder.rich_text}
                founderLinkedin = {link.properties.FounderLinkedin.url}
                email = {link.properties.Email.email}
                bridge = {link.properties.Bridge.url}
              />
            ))}
          </ul>
         
  
          {isPortfolioCompany ? (
            <div>
              <div className={styles.homeSectionContainer}>
                <h2 className={styles.homeSectionTitle}>Founder Perks</h2>
                <Link href="/perks">
                  <a className={styles.homeLinkButton}>View All</a>
                </Link>
              </div>
            
              <div className = {styles.homeFounderGrid}>
                <FounderRequestTile
                  title = "Reach out to us"
                  type = "internal"
                  logo = "intro"
                  portfolioList = {portfolioListCompanies}
                />

                <FounderRequestTile
                  title = "Request an intro"
                  type = "internal"
                  logo = "help"
                  portfolioList = {portfolioListCompanies}
                />

                <FounderRequestTile
                            title = "AWS Credits"
                            logo = "amazon.com"
                            type = "engineering"
                            portfolioList = {portfolioListCompanies}
                  />
                </div>
            </div>

          ): null}

          {isPortfolioCompany ? (
            <>
              <div className={styles.homeSectionContainer}>
                <h2 className={styles.homeSectionTitle}>Investor Network</h2>
                <Link href="/investors">
                  <a className={styles.homeLinkButton}>View All</a>
                </Link>
              </div>
              
              <div className = {styles.homeInvestorGrid}>
              {investorListList.map((link) => (
                <InvestorListTile
                  key = {link.id}
                  title={link.properties.Name.title[0].plain_text}
                  fund={link.properties.Fund.multi_select}
                  stage={link.properties.Stage.multi_select}
                  url = {link.properties.URL.url}
                  linkedin = {link.properties.Linkedin.url}
                  bridge = {link.properties.Bridge.url}
                  about = {link.properties.About.rich_text}
                />
            ))}

              </div>
             </> 
                
          ): null}


          
          
             

          {/* <div className={styles.homeSectionContainer}>
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
          </ul> */}

          
        </div>

      
 

      </main>
    </>
  );
}


//notion API
export async function getStaticProps() {
  const alchemy_notion = new Client({ auth: process.env.ALCHEMOTION_API_KEY});

  const portfolioListResponse = await alchemy_notion.databases.query({
    database_id: process.env.NOTION_PORTFOLIOLIST_ID,
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
        direction: "ascending",
      },
    ],
    page_size: 8,
  });

  const investorListResponse = await alchemy_notion.databases.query({
    database_id: process.env.NOTION_INVESTORLIST_ID,
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
    page_size: 4,
  });

  const portfolioListCompanies = await alchemy_notion.databases.query({
    database_id: process.env.NOTION_PORTFOLIOLIST_ID,
    sorts: [
      {
        property: "Company",
        direction: "ascending",
      },
    ],
  });


  return {
    props: {
      portfolioListList: portfolioListResponse.results,
      portfolioListCompanies: portfolioListCompanies.results,
      investorListList: investorListResponse.results,
    },
    revalidate: 5,
  };
}


