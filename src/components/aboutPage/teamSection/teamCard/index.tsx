import styles from "./styles.module.css";

export default function TeamCard(props) {
  return (
    <div className={`${styles.card} row`}>
      <img src={props.img} alt={props.name} className={styles.img} />
      <div className={`${styles.col} col`}>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.position}>{props.position}</div>
      </div>
    </div>
  );
}
