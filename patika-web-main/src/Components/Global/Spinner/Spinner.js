const { useSelector } = require("react-redux");
import styles from "./Spinner.module.css";
const Spinner = () => {
  const isLoading = useSelector((state) => state.content.loading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className={styles.spinnerContainer}>
      {" "}
      <div className={`${styles.spinner} ${styles.loader}`}></div>
    </div>
  );
};
export default Spinner;
