import styles from "./LandscapeWarning.module.css";
export default function LandscapeWarning() {
  return (
    <div className={styles.landscapeWarningContainer}>
      <div className={styles.phone}></div>
      <div className={styles.message}>Please rotate your device!</div>
    </div>
  );
}
