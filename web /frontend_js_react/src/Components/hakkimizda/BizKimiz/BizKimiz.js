import Image from "next/image";
import styles from "./BizKimiz.module.css";
import Link from "next/link";
const BizKimiz = () => {
  return (
    <div className={styles.bizKimizContainer}>
      <div className={styles.profile_cards}>
        <div className={styles.card}>
          <div className={styles.card_description}>
            <h2 className={styles.card_description_title}>Fırat Kıl </h2>

            <span className={styles.card_description_profession}>
              Full Stack Web Geliştirici{" "}
            </span>

            <span className={styles.card_description_company}>
              Bilgisayar Mühendisliği 3/4
            </span>

            <div className={styles.card_description_social}>
              <ul className={styles.list}>
                <li>
                  <Link target="_blank" href="mailto:firatkill.is@gmail.com">
                    <Image
                      src="/mail_icon.svg"
                      alt="mail icon"
                      width={25}
                      height={25}
                      priority
                    />
                  </Link>
                </li>

                <li>
                  <Link target="_blank" href="https://github.com/firatkill/">
                    <Image
                      src="/github_icon.svg"
                      alt="github icon"
                      width={25}
                      height={25}
                      priority
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href="https://www.linkedin.com/in/firatkill/"
                  >
                    {" "}
                    <Image
                      src="/linkedin_icon.svg"
                      alt="linkedin icon"
                      width={25}
                      height={25}
                      priority
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Image
            width={1260}
            height={750}
            priority
            src="/firat.webp"
            alt="profile"
            className={styles.card_image}
          />
        </div>
        <div className={styles.card}>
          <div className={styles.card_description}>
            <h2 className={styles.card_description_title}>Sezer Küçükcan </h2>

            <span className={styles.card_description_profession}>
              Veri Bilimci
            </span>

            <span className={styles.card_description_company}>
              Elektrik - Elektronik Mühendisliği
              <Image
                src="/graduate.svg"
                width={30}
                height={30}
                priority
                alt="profile"
              />
            </span>

            <div className={styles.card_description_social}>
              <ul className={styles.list}>
                <li>
                  <Link target="_blank" href="mailto:kucukcansezer8@gmail.com">
                    <Image
                      src="/mail_icon.svg"
                      alt="mail icon"
                      width={25}
                      height={25}
                      priority
                    />
                  </Link>
                </li>

                <li>
                  <Link target="_blank" href="https://github.com/Sezerkcan">
                    <Image
                      src="/github_icon.svg"
                      alt="github icon"
                      width={25}
                      height={25}
                      priority
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href="https://www.linkedin.com/in/sezer-kucukcan/"
                  >
                    {" "}
                    <Image
                      src="/linkedin_icon.svg"
                      alt="linkedin icon"
                      width={25}
                      height={25}
                      priority
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Image
            width={1260}
            height={750}
            priority
            src="/sezer.webp"
            alt="profile"
            className={styles.card_image}
          />
        </div>
        <div className={styles.card}>
          <div className={styles.card_description}>
            <h2 className={styles.card_description_title}>
              Mehmet Emin Güvercin
            </h2>

            <span className={styles.card_description_profession}>
              Veri Bilimci
            </span>

            <span className={styles.card_description_company}>
              Bilgisayar Mühendisliği 4/4
            </span>

            <div className={styles.card_description_social}>
              <ul className={styles.list}>
                <li>
                  <Link target="_blank" href="mailto:m.guvercin34@gmail.com">
                    <Image
                      src="/mail_icon.svg"
                      alt="mail icon"
                      width={25}
                      height={25}
                      priority
                    />
                  </Link>
                </li>

                <li>
                  <Link target="_blank" href="https://github.com/meguvercin">
                    <Image
                      src="/github_icon.svg"
                      alt="github icon"
                      width={25}
                      height={25}
                      priority
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href="https://www.linkedin.com/in/meguvercin"
                  >
                    {" "}
                    <Image
                      src="/linkedin_icon.svg"
                      alt="linkedin icon"
                      width={25}
                      height={25}
                      priority
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Image
            width={1260}
            height={750}
            priority
            src="/mehmet.webp"
            alt="profile"
            className={styles.card_image}
          />
        </div>
      </div>{" "}
    </div>
  );
};
export default BizKimiz;
