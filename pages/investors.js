import util from "../styles/util.module.css";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Settings from "../components/settings";
import InvestorTile from "../components/tiles/investorTile";
const { Client } = require("@notionhq/client");


export default function Investors({list}) {

    const router = useRouter();
    const [filter, setFilter] = React.useState(null);
    const [fav, setFav] = React.useState(null);
    const [currentList, setCurrentList] = React.useState(null);

    const filters = ["Infrastructure", "Consumer", "SaaS", "DeFi", "NFTs"];

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
      let filterSelected = sessionStorage.getItem("investor-filter");
      if (filterSelected && filterSelected !== filter) {
        setFilter(filterSelected);
      } else {
        setFilter("all");
      }
    }
    //set fav when no filter in url, but in the same session
    if (router && router.query.favonly == null) {
      let favSelected = sessionStorage.getItem("investor-fav");
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
        sessionStorage.setItem("investor-filter", filter);
        sessionStorage.setItem("investor-fav", false);
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
        sessionStorage.setItem("investor-filter", filter);
        sessionStorage.setItem("investor-fav", true);
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
        sessionStorage.setItem("investor-filter", "all");
        sessionStorage.setItem("investor-fav", true);
        for (var i = 0; i < list.length; i++) {
          if (list[i].properties.Fav.checkbox == fav) {
            tempList.push(list[i]);
          }
        }
      } else if (filter == "all" && !fav) {
        router.push({
          query: {},
        });
        sessionStorage.setItem("investor-filter", "all");
        sessionStorage.setItem("investor-fav", false);
        for (var i = 0; i < list.length; i++) {
          tempList.push(list[i]);
        }
      }
      setCurrentList(tempList);
    }
  }, [filter, fav]);



    return (
        <main className = {util.page}>
            <div className = {util.pageColumn}>
                <h1 className = {util.header}>Investors</h1>
                <p className = {util.description}>Investors available to outreach to through Alchemy.</p>
            
                <div className={util.inlineCTA}>
                    <div>
                    <h3 className={util.tileTitle}>Want to pitch?</h3>
                    <p className={util.tileContent}>
                        {
                        "Please prepare a blurb that we can forward to the investors on behalf of you."
                        }
                    </p>
                    </div>
                </div>

            <ul className={util.list}>

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

            </div>

            {currentList ? (
              currentList.length == 0 ? (
                <div className={util.emptyState}>
                  Nothing found. Please try adjusting the filter.
                </div>
              ) : (
                currentList.map((link) => (
                  <InvestorTile
                    key={link.id}
                    title={link.properties.Name.title[0].plain_text}
                    url={link.properties.URL.url}
                    fund={link.properties.Fund.multi_select}
                    bridge = {link.properties.Bridge.url}
                    about = {link.properties.About.rich_text}
                  />
                ))
              )
            ) : (
              <p>loading...</p>
            )}

            </ul>


          </div>
       
        </main>
    );
}

export async function getStaticProps() {
    const notion = new Client({ auth: process.env.ALCHEMOTION_API_KEY });
    const response = await notion.databases.query({
      database_id: process.env.NOTION_INVESTORLIST_ID,
    });
    return {
      props: {
        list: response.results,
      },
      revalidate: 5,
    };
  }
  
  
  