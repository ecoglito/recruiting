import React from 'react';
import styles from "./investorListTile.module.css";
import util from "../../../styles/util.module.css";
import Image from "next/image";
import  InvestorOverlay  from "../overlays/investorOverlay";
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


export default function InvestorListTile({ title, fund, stage, url, about, linkedin, bridge }) {

    const Stage = () => {
        return (
            <div className={util.tags + " " + util.flexRow}>
            {stage
                ? stage.map((tag) => (
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
        <div>
           <DialogRoot>
            <DialogTrigger asChild>
            <div className = {styles.homeInvestorDiv}>
                <div className = {styles.stack}>
                    <div className = {styles.companyRow}>
                        <div className = {styles.companyHeader}>
                            <div className={styles.icon}>
                                <Image unoptimized onError="this.src='/feature/link.svg'"src={ "https://s2.googleusercontent.com/s2/favicons?domain_url=" + url +"&sz=64" } height={20} width={20} alt="url favicon" />
                            </div>
                            <h3 className={styles.tileTitle}>{title}</h3>
                        </div>
                        <Fund />
                    </div>
                    <Stage />
               
                </div>
                
            </div>
            </DialogTrigger>

            <DialogPortal>
                <DialogOverlay className={styles.overlay} />
                <DialogContent className={styles.content} onOpenAutoFocus={(event) => event.preventDefault()}>
                  <InvestorOverlay fund = {fund}  title={title} url={url} about={about} linkedin={linkedin} bridge={bridge} />
                </DialogContent>
            </DialogPortal>
            </DialogRoot>
        </div>
)}; 