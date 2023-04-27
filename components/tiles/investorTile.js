import styles from "./investorTile.module.css";
import Image from "next/image";
import util from "../../styles/util.module.css";
import * as Tooltip from "@radix-ui/react-tooltip";
import React, { useState } from "react";
import InvestorOverlay from "./overlays/investorOverlay";

import {
  Root as DialogRoot,
  Trigger as DialogTrigger,
  Portal as DialogPortal,
  Overlay as DialogOverlay,
  Content as DialogContent,
  Title as DialogTitle,
  Dialog,
  DialogDescription,
} from "@radix-ui/react-dialog";

export default function InvestorTile({
  title,
  url,
  fund,
  stage,
  tags,
  about,
  bridge,
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

    <div>
      <DialogRoot>
        <DialogTrigger asChild>
        <div className={styles.person}>
          <div
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
          </div>
        </div>
        </DialogTrigger>
        
        <DialogPortal>
          <DialogOverlay className={styles.overlay} />
          <DialogContent className={styles.content} onOpenAutoFocus={(event) => event.preventDefault()}>
            <InvestorOverlay title={title} url={url} fund={fund} stage={stage} tags={tags} about={about} bridge={bridge} />
          </DialogContent>
        </DialogPortal>

    </DialogRoot>
    </div>
  );
}
