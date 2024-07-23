import Image from "next/image";
import styles from "./Sections.module.css";
const Section_3 = () => {
  return (
    <div
      id="section_3"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      className={`${styles.sectionContainer} ${styles.section_3_Container}`}
    >
      <Image
        style={{
          width: "auto !important",
          height: "30% !important",
          maxWidth: "900px",
        }}
        width={100}
        height={100}
        priority
        src="/third_section.svg"
        alt="profile"
        className={styles.third_section_image}
      />

      <Image
        style={{
          height: "40% !important",
          width: "auto !important",
          maxWidth: "600px",
          marginTop: "-3%",
        }}
        width={100}
        height={75}
        priority
        src="/gear.gif"
        alt="profile"
        className={styles.third_section_gif}
      />

      <h4
        className={styles.mobileIntegText}
        style={{
          height: "30% !important",
          width: "100% !important",
          maxWidth: "900px",
          fontSize: "1.25rem",
          textAlign: "center",
        }}
      >
        Müşteriden elde edilmiş tüm bilgiler ( kişilik testleri, anketler ve
        seçilmiş kampanyalar ) güncel bilgilerle tekrar tahmin modeline
        gönderilerek, müşteri memnuniyeti ve önerilebilecek kampanyaların
        isabeti arttırılmış olunur.
      </h4>
    </div>
  );
};
export default Section_3;
