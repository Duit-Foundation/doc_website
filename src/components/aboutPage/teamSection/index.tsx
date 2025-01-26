import styles from "./styles.module.css";
import Heading from "@theme/Heading";
import Translate from "@docusaurus/Translate";
import TeamCard from "./teamCard";

type TeamItem = {
  img: string;
  name: React.ReactElement;
  position: React.ReactElement;
};

const heading = <Translate>Команда</Translate>;
const TargetsList: TeamItem[] = [
  {
    img: "/img/aboutPage/person.png",
    name: <Translate>Фамилия Имя</Translate>,
    position: <Translate>Важный хуй</Translate>,
  },
  {
    img: "/img/aboutPage/person.png",
    name: <Translate>Фамилия Имя</Translate>,
    position: <Translate>Влажный хуй</Translate>,
  },
  {
    img: "/img/aboutPage/person.png",
    name: <Translate>Фамилия Имя</Translate>,
    position: <Translate>Важный хуй</Translate>,
  },
];

export default function TeamSection(props) {
  return (
    <div className="container">
      <Heading as="h2" className={styles.heading}>
        {heading}
      </Heading>
      <div className={`${styles.row} row`}>
        {TargetsList.map((props, idx) => (
          <TeamCard key={idx} {...props} />
        ))}
      </div>
    </div>
  );
}
