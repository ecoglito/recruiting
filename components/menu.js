import styles from "../components/menu.module.css";
import { ThemeChanger } from "./theme";
import Link from "next/link";
import NavLink from "./navLink";
import Contact from "./contact";
import util from "../styles/util.module.css";
import SignInModal from "./signInModal";
import { useSession } from "next-auth/react";
import React, {useContext} from "react";


import { GlobalStateContext } from "../GlobalState";


export default function Menu( {list} ) {
  const { data: session } = useSession();

  const { isPortfolioCompany, setIsPortfolioCompany } = useContext(GlobalStateContext);

  function getCompanyNameFromEmail(email) {
    let companyName = email.split("@")[1].split(".")[0];
    companyName = companyName.toUpperCase();
    return companyName;
  }

  let matchedEmail = false;

  function checkEmails(userEmail) {
    userEmail = getCompanyNameFromEmail(userEmail);
    return (userEmail === "ALCHEMY") ? true : false;
  }

  if (session) {
    matchedEmail = checkEmails(session.user.email);
  }

  console.log(list);



  return (
    <div className={styles.container}>
      
      <div className={styles.upper}>
        <Link href="/">
          <img style = {{width: "150px"}}
            className={util.hiddenOnMobile + " " + util.pointer + " logoInvert"}
            src="/logo.png"
            alt="site logo"
          ></img>
        </Link>

        <nav className={styles.nav}>
          <NavLink svg="recents" href="/" label="Home" shortcut="1" />
          <NavLink svg="about" href="/about" label="About" shortcut="2" />
          <NavLink svg="projects" href="/companies" label="Portfolio" shortcut="3" />

          {isPortfolioCompany ? (
            <>
              <NavLink svg="users" href="/talent" label="Talent" shortcut="4" />
              <NavLink svg="money" href="/investors" label="Investors" shortcut="5" />
            
              <p className={styles.divider}>Resources</p>
              <NavLink
                svg="perks"
                href="/perks"
                label="Founder Perks"
                shortcut="6"
              />
            </>
          ) : null}
          

          <p className={styles.divider}>Reach out</p>
          <Contact svg="chat" label="Contact" shortcut="/" />
          <NavLink
            svg="twitter"
            href="https://twitter.com/alchemyplatform"
            label="Twitter"
            external="true"
          />

         {matchedEmail ? (
          <>
         <p className={styles.divider}>Ventures Employees (Confidential)</p>
         <NavLink
         svg="overview"
         href="/overview"
         label="Overview"
         shortcut="8"
       />
       </>
         ) : null}

        </nav>
      </div>
      <div className={styles.loginDiv}>
        <SignInModal />
        <ThemeChanger />
      </div>
    </div>
  );
}
