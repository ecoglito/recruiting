import util from "../styles/util.module.css";
import React, { useEffect } from "react";
import FounderRequestTile from "../components/tiles/homeVersions/founderRequestTile";
import { useRouter } from "next/router";
import { Client } from "@notionhq/client";


export default function Investors({list}) {

    return (
        <main className = {util.page}>
            <div className = {util.pageColumn}>
                <h1 className = {util.header}>Perks</h1>
                <p className = {util.description}>Custom benefits designed exactly for your needs.</p>
            
                <div className={util.inlineCTA}>
                    <div>
                    <h3 className={util.tileTitle}>Want to advertise here?</h3>
                    <p className={util.tileContent}>
                        {
                        "Send in a request below with the details of your offering and we'll make it happen!"
                        }
                    </p>
                    </div>
                </div>

                
                {/* Alchemy Perks */}
                <ul className={util.list}>
                    <div className={util.tabBar}>
                        <p className = {util.perksSubHeader}>Internal Support </p>
                    </div>
                    <div className = {util.stack}>
                        <FounderRequestTile
                            type = "internal"
                            title = "Reach out to us"
                            logo = "intro"
                            portfolioList = {list}
                        />

                        <FounderRequestTile
                            type = "internal"
                            title = "Request an intro"
                            logo = "help"
                            portfolioList = {list}
                        />
                    </div>

                    <div className={util.tabBar}>
                        <p className = {util.perksSubHeader}>Engineering</p>
                    </div>

                    <div className = {util.stack}>
                        <FounderRequestTile
                            title = "AWS Credits"
                            logo = "amazon.com"
                            type = "engineering"
                            portfolioList = {list}
                        />
                    
                    </div>




                    
                </ul>
            
            

        
          
          </div>
       
        </main>
    );
}

export async function getStaticProps() {
    const alchemy_notion = new Client({ auth: process.env.ALCHEMOTION_API_KEY});
  
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
        list: portfolioListCompanies.results,
      },
      revalidate: 5,
    };
  }