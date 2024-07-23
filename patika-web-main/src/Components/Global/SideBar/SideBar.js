import Link from "next/link";
import styles from "./SideBar.module.css";
export default function SideBar() {
  return (
    <div className={styles.sideBarContainer}>
      <div className={styles.sideBarListContainer}>
        <ul className={styles.sideBarList}>
          <Link href="/" className={styles.sideBarListItem}>
            Anasayfa
          </Link>
          <Link href="/detay" className={styles.sideBarListItem}>
            Sunum
          </Link>

          <Link href="/hakkimizda" className={styles.sideBarListItem}>
            Biz Kimiz?
          </Link>
        </ul>
        <div className={styles.sidebarArrow}>{">"}</div>
      </div>
    </div>
  );
}
