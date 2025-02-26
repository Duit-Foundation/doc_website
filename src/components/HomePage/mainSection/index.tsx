import styles from "./styles.module.css";
import Card from "./card";
import MainCard from "./mainCard";
import DocBtn from './docBtn';

type Card = {
  icon: React.ComponentType;
  svg: React.ComponentType;
  bgColor: string;
  title: string;
  description: string;
  hasAntiRadius?: boolean;
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
    hasAntiRadius: true
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
    <section className={`container ${styles.container}`}>
      <div className={`row ${styles.centerdRow}`}>
        <div className={`col ${styles.mobileCenteredCol}`}>
          <div className="row">
            <div className="col">
              <div className={styles.mainCard}>
                <MainCard />
              </div>
            </div>
          </div>
          <div className={`row ${styles.centerdRow}`}>
            <div className={`col ${styles.docBtn} ${styles.cardCol}`}>
              <DocBtn />
            </div>
            <div className={`col ${styles.cardCol}`}>
              <Card {...cards[0]} />
            </div>
          </div>
        </div>
        <div className={`col ${styles.cardCol} ${styles.cardsCol}`}>
          <div className="row">
            <Card {...cards[1]} />
          </div>
          <div className="row">
            <Card {...cards[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}
