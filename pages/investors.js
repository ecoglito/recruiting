import util from "../styles/util.module.css";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Settings from "../components/settings";
const { Client } = require("@notionhq/client");


export default function Investors(list) {

    const router = useRouter();
    const [filter, setFilter] = React.useState(null);
    const [fav, setFav] = React.useState(null);
    const [currentList, setCurrentList] = React.useState(null);

    const filters = ["Engineering", "Product", "Growth", "Design"];

    function removeFilter() {
        setFilter("all");
      }
      function handleTagChange(e) {
        setFilter(e.target.innerHTML);
      }


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
              <Settings status={fav} updateCheckbox={setFav} />
            </div>
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
  
  
  