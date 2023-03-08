import styles from ".//talentTile.module.css";
import Image from "next/image";
import util from "../../styles/util.module.css";
import * as Tooltip from "@radix-ui/react-tooltip";
import React, { useState } from "react";

export default function InvestorTile({
  title,
  url,
  fund,
  stage,
  tags,
}) {
    
    let displayUrl;
    if (url) {
      displayUrl = url
        .replace("https://www.", "")
        .replace("http://www.", "")
        .replace("https://", "")
        .replace("http://", "");
    } else {
      // You can set displayUrl to some default value if url is null or undefined
      displayUrl = "";
    }

  return (
    <div className={styles.person}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.container}
      >
        
        <div className={styles.icon}>
          <Image
            onError="this.src='/feature/link.svg'"
            src={
              "https://s2.googleusercontent.com/s2/favicons?domain_url=" +
              url +
              "&sz=64"
            }
            height={20}
            width={20}
            alt="url favicon"
          ></Image>
        </div>

        <div className={styles.right}>
          <div className={styles.stack}>
            <div>
              <h3 className={util.tileTitle + " " + styles.inline}>{title}</h3>
              <span className={styles.externalIcon}>↗</span>
            </div>

            <p className={styles.url + " " + util.hiddenOnMobile}>
              {displayUrl}
            </p>
          </div>
          <div className={util.tags + " " + util.flexRow}>
            {fund
              ? fund.map((tag) => (
                  <p
                    key={tag.name + tag.color}
                    className={tag.color + "Tag tag"}
                  >
                    {tag.name}
                  </p>
                ))
              : null}
          </div>
        </div>
      </a>
    </div>
  );
}
