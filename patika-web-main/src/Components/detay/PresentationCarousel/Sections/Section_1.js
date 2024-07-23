import Image from "next/image";
import styles from "./Sections.module.css";
const Section_1 = () => {
  return (
    <div id="section_1" className={styles.sectionContainer}>
      <Image
        width={100}
        height={216}
        priority
        src="/first_section.svg"
        alt="profile"
        className={styles.first_draft_image}
      />
    </div>
  );
};
export default Section_1;
