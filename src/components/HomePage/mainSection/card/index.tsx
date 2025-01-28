import styles from "./styles.module.css";
import Heading from "@theme/Heading";

export default function Card(prop): JSX.Element {
  return (
    <div className={styles.card} style={{ backgroundColor: prop.bgColor }}>
      <div className={styles.img}>
        {prop.icon ? <prop.icon className={styles.icon} /> : <></>}
        {prop.svg ? <prop.svg className={styles.svg} /> : <></>}
      </div>
      <div className={prop.icon ? styles.text : styles.hText}>
        <Heading as="h4" className={prop.icon ? styles.title : styles.hTitle}>
          {prop.title}
        </Heading>
        <div className={prop.icon ? styles.description : styles.hDescription}>
          {prop.description}
        </div>
      </div>
      {prop.icon ? (
        <></>
      ) : (
        <button className={styles.hBtn}>{prop.btnText}</button>
      )}
    </div>
  );
}
