import styles from "./styles.module.css";
import Heading from "@theme/Heading";
import { type Card } from "../types";

export default function Card(prop: Card): JSX.Element {
  return (
    <div className={styles.card} style={{ backgroundColor: prop.bgColor }}>
      <div className={styles.img}>
        {prop.icon ? <prop.icon className={styles.icon} /> : <></>}
        {prop.svg ? <prop.svg className={styles.svg} /> : <></>}
      </div>
      <div className={prop.icon ? styles.text : styles.hText}>
        <Heading as="h4" className={prop.icon ? styles.title : styles.hTitle}>
          {Array.isArray(prop.title)
            ? prop.title.map((t, index) => <span key={index}>{t}</span>)
            : prop.title}
        </Heading>
        <div className={prop.icon ? styles.description : styles.hDescription}>
          {prop.description}
        </div>
      </div>
      {prop.icon ? (
        <></>
      ) : (
        <button className={styles.hBtn} onClick={prop.handleOnCLick}>
          {prop.btnText}
        </button>
      )}
      {prop.hasAntiRadius ? (
        <div className={styles.antiRadiusContainer}>
          <div className={styles.antiRadius}></div>
        </div>
      ) : null}
    </div>
  );
}
