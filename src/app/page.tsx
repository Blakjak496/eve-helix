import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Nox Tools</h1>
      <p className={styles.subtitle}>EVE Online tools — under construction.</p>
    </div>
  );
}
