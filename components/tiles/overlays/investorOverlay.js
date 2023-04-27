import {
    Root as DialogRoot,
    Trigger as DialogTrigger,
    Portal as DialogPortal,
    Overlay as DialogOverlay,
    Content as DialogContent,
    Title as DialogTitle,
    Dialog,
    DialogDescription
  } from "@radix-ui/react-dialog";

import styles from "./investorOverlay.module.css";
import Image from "next/image";
import util from "../../../styles/util.module.css"
  
export default function InvestorOverlay({title, fund, stage, url, about, linkedin, bridge}) {
    

    const Fund = () => {
        return (
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
        )
    }

return (

    <div className = {styles.verticalContainer}>
                   <div className= {styles.titleRow}>
                       <div className = {styles.title}>
                           <a href = {linkedin} className = {styles.overlayTitleLink} >
                               <DialogTitle className = {styles.title}>{title}</DialogTitle>
                               <span className = {styles.linkArrow}>↗</span>
                           </a>
                       </div>
                       <Fund />
                   </div>
                   <div className = {styles.contentWrapper}>
                       <h4 className = {styles.subheader}>About:</h4>
                       <p className = {styles.description}>
                       {about.map((e, i) => (
                           <a key={i} href={e.href}>
                               {e.plain_text}
                           </a>
                       ))}
                       </p>
                   </div>
                   
                   
                   {bridge ? (
                       
                        <div className = {styles.contentWrapper}>
                           <h4 className = {styles.subheader}>REACH OUT:</h4>
                        <a
                            className={styles.primaryButton + " " + styles.primaryButtonContainer}
                            href={bridge}
                            target="_blank"
                            rel="noopener noreferrer" >     
                        <span className = {styles.requestText}>Request An Intro</span>
                        <span className={styles.externalIcon}>↗</span>
                        </a>
                       
                    </div>
                   ) : null}
    </div>

)
}