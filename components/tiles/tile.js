import styles from ".//tile.module.css";
import util from "../../styles/util.module.css";

import Image from "next/image";

export default function Tile({
  internalUrl,
  logoUrl,
  title,
  content,
  tags,
  date,
  url,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {internalUrl ? (
          <Image
            className={styles.icon}
            priority
            unoptimized
            src={"/recents/" + internalUrl + ".png"}
            height={28}
            width={28}
            alt={title}
          />
        ) : (
          <Image
            className={styles.icon}
            priority
            unoptimized
            src={logoUrl}
            height={28}
            width={28}
            alt={title}
          />
        )}
      </div>

      <div className={styles.right}>
        <div className={styles.stack}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.titleLink}
          >
            <h3 className={util.tileTitle + " " + styles.inline}>{title}</h3>
            <span className={styles.externalIcon}>↗</span>
          </a>
          <p className={util.tileContent}>{content}</p>
          <div className={util.tags + " " + util.flexRow}></div>
        </div>
        <p className={styles.date}>
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          })}
        </p>
      </div>
    </div>
  );
}
