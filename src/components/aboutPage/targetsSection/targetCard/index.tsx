import styles from "./styles.module.css";
import Heading from "@theme/Heading";

export default function TargetCard(props) {
  return (
    <div className={styles.card}>
      <div className={styles.index}>{props.index}</div>
      <Heading as="h3" className={styles.title}>
        {props.title}
      </Heading>
      <p className={styles.description}>{props.description}</p>
    </div>
  );
}
