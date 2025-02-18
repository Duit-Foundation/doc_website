import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Chat from "./Chat";

export default function PromoSection(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className={`container ${styles.container}`}>
        <div className="row">
          <div className={`${styles.title} col col--7`}>
            <Heading as="h1" className={styles.heading}>
              Ваше <span className={styles.yellow}>приложение</span> живет на
              сервере
            </Heading>
            <p className={styles.description}>
              Вы определяете элементы, состояния и анимации на серверной
              стороне, и они отправляются клиенту независимо от версии
              приложения. Обновляйте UI приложения по мере необходимости — будь
              то каждый час или даже чаще.
            </p>
          </div>
          <div className="col col--5">
            <Chat />
          </div>
        </div>
      </div>
    </section>
  );
}
