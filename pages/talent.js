import Head from "next/head";
import util from "../styles/util.module.css";
import TalentTile from "../components/tiles/talentTile";
const { Client } = require("@notionhq/client");
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import Settings from "../components/settings";

export default function Talent({ list }) {
  const description =
    "We've spent hours pouring over all the talent in web3 to create a curated list of the best of the best. \nRemember, with great power, comes great responsibility. ";

  //filtering logic depends on query params
  //if no query we assume the section is "recently added" and fav setting is "false"
  //if you toggle section or fav setting, the changed setting will be reflected in param
  //removing filter param triggers all and "overview"
  const router = useRouter();
  const [filter, setFilter] = React.useState(null);
  const [fav, setFav] = React.useState(null);
  const [currentList, setCurrentList] = React.useState(null);

  useEffect(() => {
    let thisPage = document.querySelector("#talentPage");
    let top = sessionStorage.getItem("talent-scroll");
    if (top !== null) {
      thisPage.scrollTop = top;
    }
    const handleScroll = () => {
      sessionStorage.setItem("talent-scroll", thisPage.scrollTop);
    };
    thisPage.addEventListener("scroll", handleScroll);
    return () => thisPage.removeEventListener("scroll", handleScroll);
  }, []);

  //logic should remember filter, fav setting, and it's very own scroll pos

  const filters = ["Engineering", "Product", "Growth", "Design"];

  //handlers to handle filter and fav setting changes
  function removeFilter() {
    setFilter("all");
  }
  function handleTagChange(e) {
    setFilter(e.target.innerHTML);
  }

  //set initial states when url has queries
  useEffect(() => {
    if (router.query.filter && router.query.filter !== filter) {
      setFilter(router.query.filter);
    }
  }, [router.query.filter]);
  useEffect(() => {
    if (router.query.favonly) {
      if (fav !== true) {
        setFav(true);
      }
    } else {
      setFav(false);
    }
  }, [router.query.favonly]);
  //set initial state when url has no queries
  useEffect(() => {
    //preset filter when there's no filter in url, but data stored in local storage
    if (router && router.query.filter == null) {
      let filterSelected = sessionStorage.getItem("talent-filter");
      if (filterSelected && filterSelected !== filter) {
        setFilter(filterSelected);
      } else {
        setFilter("all");
      }
    }
    //set fav when no filter in url, but in the same session
    if (router && router.query.favonly == null) {
      let favSelected = sessionStorage.getItem("talent-fav");
      if (favSelected == "true") {
        setFav(true);
      } else {
        setFav(false);
      }
    }
  }, []);

  useEffect(() => {
    if (filter && fav !== null) {
      //cycle through scenarios and compose lists
      let tempList = [];
      if (filter !== "all" && !fav) {
        router.push({
          query: { filter: filter },
        });
        sessionStorage.setItem("talent-filter", filter);
        sessionStorage.setItem("talent-fav", false);
        for (var i = 0; i < list.length; i++) {
          for (
            var j = 0;
            j < list[i].properties.Tags.multi_select.length;
            j++
          ) {
            if (
              list[i].properties.Tags.multi_select[j].name ==
              filter.replace("&amp;", "&")
            ) {
              tempList.push(list[i]);
            }
          }
        }
      } else if (filter !== "all" && fav) {
        router.push({
          query: { filter: filter, favonly: fav },
        });
        sessionStorage.setItem("talent-filter", filter);
        sessionStorage.setItem("talent-fav", true);
        for (var i = 0; i < list.length; i++) {
          for (
            var j = 0;
            j < list[i].properties.Tags.multi_select.length;
            j++
          ) {
            if (
              list[i].properties.Tags.multi_select[j].name ==
                filter.replace("&amp;", "&") &&
              list[i].properties.Fav.checkbox == fav
            ) {
              tempList.push(list[i]);
            }
          }
        }
      } else if (filter == "all" && fav) {
        router.push({
          query: { favonly: fav },
        });
        sessionStorage.setItem("talent-filter", "all");
        sessionStorage.setItem("talent-fav", true);
        for (var i = 0; i < list.length; i++) {
          if (list[i].properties.Fav.checkbox == fav) {
            tempList.push(list[i]);
          }
        }
      } else if (filter == "all" && !fav) {
        router.push({
          query: {},
        });
        sessionStorage.setItem("talent-filter", "all");
        sessionStorage.setItem("talent-fav", false);
        for (var i = 0; i < list.length; i++) {
          tempList.push(list[i]);
        }
      }
      setCurrentList(tempList);
    }
  }, [filter, fav]);

  return (
    <>
      <Head>
        <title>{"Talent List"}</title>
        <meta name="description" content={description} />
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

      <main className={util.page} id="talentPage">
        <div className={util.pageColumn}>
          <h1 className={util.header}>Talent</h1>
          {/* <p className={util.description}>{description}</p>

          <div className={util.inlineCTA}>
            <div>
              <h3 className={util.tileTitle}>Open to new opportunities?</h3>
              <p className={util.tileContent}>
                {
                  "Top-tier companies are hiring in web3. Want in? Let them know by signing up to be featured on Alchemy Connect."
                }
              </p>
            </div>
            <a
              className={util.button + " " + util.primaryButton}
              href={
                "mailto:hi.sj.zhang@gmail.com?subject=I'm%20open%20to%20new%20opportunities&body=Name%3A%0D%0APortfolio%3A%0D%0ALinkedin%3A%0D%0ATwitter%3A"
              }
            >
              {"Sign me up!"}
            </a>
          </div> */}
          
          <ul className={util.list}>
            <h3>
              Coming soon!
            </h3>
          </ul>

          {/* <ul className={util.list}>
            <div className={util.tabBar}>
              <div className={util.tabRow}>
                <button
                  onClick={removeFilter}
                  className={util.tab}
                  role="tab"
                  aria-selected={filter == "all" ? "true" : null}
                >
                  All
                </button>
                {filters.map((filterName) => (
                  <button
                    key={filterName}
                    onClick={handleTagChange}
                    className={util.tab}
                    role="tab"
                    aria-selected={
                      filter
                        ? filterName == filter.replace("&amp;", "&")
                          ? "true"
                          : null
                        : null
                    }
                  >
                    {filterName}
                  </button>
                ))}
              </div>
              <Settings status={fav} updateCheckbox={setFav} />
            </div>

            {currentList ? (
              currentList.length == 0 ? (
                <div className={util.emptyState}>
                  Nothing found. Please try adjusting the filter.
                </div>
              ) : (
                currentList.map((link) => (
                  <TalentTile
                    key={link.id}
                    title={link.properties.Name.title[0].plain_text}
                    url={link.properties.URL.url}
                    date={link.created_time}
                    fav={link.properties.Fav.checkbox}
                    tags={link.properties.Tags.multi_select}
                    notableUrl={
                      link.properties.NotableUrl.url == null
                        ? null
                        : link.properties.NotableUrl.url
                    }
                    notableTitle={
                      link.properties.NotableTitle.rich_text[0] == undefined
                        ? null
                        : link.properties.NotableTitle.rich_text[0].plain_text
                    }
                  />
                ))
              )
            ) : (
              <p>loading...</p>
            )}
          </ul> */}
        </div>
      </main>
    </>
  );
}

//notion API
export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  if (!process.env.NOTION_TALENTLIST_ID) {
    throw new Error("NOTION_TALENTLIST_ID is not defined");
  }
  const response = await notion.databases.query({
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
      list: response.results,
    },
    revalidate: 5,
  };
}


