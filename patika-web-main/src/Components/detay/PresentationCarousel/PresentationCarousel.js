"use client";
import { useEffect, useState } from "react";
import styles from "./PresentationCarousel.module.css";
import Section_1 from "./Sections/Section_1";
import Section_2 from "./Sections/Section_2";
import Section_3 from "./Sections/Section_3";
import Section_4 from "./Sections/Section_4";
import Image from "next/image";
import { usePathname } from "next/navigation";

const PresentationCarousel = () => {
  const [current, setCurrent] = useState(1);
  const pathname = usePathname();

  useEffect(() => {
    if (window != undefined) {
      window.scroll(0, (current - 1) * window.innerHeight);
      window.onwheel = (e) => {
        if (e.deltaY < 0) {
          const scrollTo = Math.floor(window.scrollY / window.innerHeight);
          window.scroll(0, scrollTo * window.innerHeight);
          setCurrent(scrollTo + 1);
        } else if (e.deltaY > 0) {
          const scrollTo = Math.ceil(window.scrollY / window.innerHeight);
          window.scroll(0, scrollTo * window.innerHeight);
          setCurrent(scrollTo + 1);
        }
      };
      window.onkeyup = (e) => {
        if (e.keyCode == 38) {
          const scrollTo = Math.ceil(window.scrollY / window.innerHeight);
          window.scroll(0, (current - 1) * window.innerHeight);
          setCurrent(scrollTo == 0 ? 1 : scrollTo);
        } else if (e.keyCode == 40) {
          window.scroll(0, current * window.innerHeight);
          setCurrent(current == 4 ? 4 : current + 1);
        }
      };
    }
  }, [current, pathname]);

  const changeHandler = (e) => {
    if (window != undefined) {
      const scrollTo = e.currentTarget.dataset.buttonid - 1;
      window.scroll(0, scrollTo * window.innerHeight);
      setCurrent(scrollTo + 1);
    }
  };
  const clickHandler = (e) => {
    if (window != undefined) {
      const arrowid = e.currentTarget.dataset.arrowid;
      if (arrowid == "up" && current <= 4 && current > 1) {
        setCurrent(current - 1);
        window.scroll(0, current * window.innerHeight);
      } else if (arrowid == "down" && current < 4 && current >= 1) {
        setCurrent(current + 1);
        window.scroll(0, current * window.innerHeight);
      }
    }
  };
  return (
    <div
      id="presentationCarousel"
      className={styles.presentationCarouselContainer}
    >
      <Section_1 />
      <Section_2 />
      <Section_3 />
      <Section_4 />

      <div className={styles.carouselDots}>
        <Image
          data-arrowid="up"
          onClick={clickHandler}
          className={styles.arrow}
          src="/up_arrow.svg"
          alt="up arrow"
          width={50}
          height={50}
          priority
        />
        <input
          onChange={changeHandler}
          checked={current <= 1}
          data-buttonId="1"
          id="carousel-dot-1"
          type="radio"
          name="carousel-dots"
        />
        <label for="carousel-dot-1">Go to item 1</label>

        <input
          onChange={changeHandler}
          checked={current == 2}
          data-buttonId="2"
          id="carousel-dot-2"
          type="radio"
          name="carousel-dots"
        />
        <label for="carousel-dot-2">Go to item 2</label>

        <input
          onChange={changeHandler}
          checked={current == 3}
          data-buttonId="3"
          id="carousel-dot-3"
          type="radio"
          name="carousel-dots"
        />
        <label for="carousel-dot-3">Go to item 3</label>

        <input
          onChange={changeHandler}
          checked={current == 4}
          data-buttonId="4"
          id="carousel-dot-4"
          type="radio"
          name="carousel-dots"
        />
        <label for="carousel-dot-4">Go to item 4</label>

        <Image
          data-arrowid="down"
          onClick={clickHandler}
          className={styles.arrow}
          src="/down_arrow.svg"
          alt="down arrow"
          width={50}
          height={50}
          priority
        />
      </div>
    </div>
  );
};
export default PresentationCarousel;
