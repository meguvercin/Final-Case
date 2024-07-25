import Image from "next/image";
import styles from "./NavBar.module.css";
import Link from "next/link";
export default function NavBar() {
  return (
    <nav>
      <div className={styles.navbarContainer}>
        <Link href="/" className={styles.slideShow}>
          {" "}
          <div className={`${styles.slide} ${styles.front}`}>
            <Image
              className={styles.slideImg}
              src="/patika.png"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
          </div>
          <div className={`${styles.slide} ${styles.back}`}>
            <Image
              src="/akbank.png"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
          </div>
        </Link>
      </div>
    </nav>
  );
}
