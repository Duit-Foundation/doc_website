import styles from "./styles.module.css";
import Card from "./card";
import MainCard from "./mainCard";

type Card = {
  icon: React.ComponentType;
  svg: React.ComponentType;
  bgColor: string;
  title: string;
  description: string;
};

const cards: Card[] = [
  {
    icon: require("@site/static/img/HomePage/mainSection/card1/clock-check.svg")
      .default,
    svg: require("@site/static/img/HomePage/mainSection/card1/path.svg")
      .default,
    bgColor: "#2E930D",
    title: "Будь быстрее всех",
    description:
      "Доведите свой показатель Time-to-Market до новых вершин, снижая сроки сроки доставки обновлений до пользователя",
  },
  {
    icon: require("@site/static/img/HomePage/mainSection/card2/blocks.svg")
      .default,
    svg: require("@site/static/img/HomePage/mainSection/card2/path.svg")
      .default,
    bgColor: "#0E9CB7",
    title: "Одна реализация - множество платформ",
    description:
      "Используйте все преимущества Flutter, создавая консистентный UI для множества целевых платформ",
  },
  {
    icon: require("@site/static/img/HomePage/mainSection/card3/progress-check.svg")
      .default,
    svg: require("@site/static/img/HomePage/mainSection/card3/path.svg")
      .default,
    bgColor: "#FC9B00",
    title: "Обновления Over the air",
    description:
      "Распространяйте обновленный UI даже на тех пользователей, которые не спешат устанавливать новые версии",
  },
];

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className={`row ${styles.row}`}>
        <div className={styles.mainContainer}>
          <div className={styles.mainCard}>
            <MainCard />
          </div>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <Card {...cards[0]} />
            </div>
          </div>
        </div>
        <div className={`${styles.col}`}>
          <Card {...cards[1]} />
          <Card {...cards[2]} />
        </div>
      </div>
    </section>
  );
}
