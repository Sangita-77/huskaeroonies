"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useId } from "react";
import defaultBookArt from "../Images/New/SnowDayBookIcon.svg";
import styles from "./BookPromo.module.css";
import CartIcon from "../Images/New/CartIcon.svg";

interface BookPromoProps {
  bookArt?: StaticImageData | string;
  bookNumber: string;
  title: string;
  buyNowHref?: string;
  top?: string;
  left?: string;
  onAddToCart?: () => void;
}

export default function BookPromo({
  bookArt = defaultBookArt,
  bookNumber,
  title,
  buyNowHref = "/shop",
  top = "0vw",
  left = "0vw",
  onAddToCart,
}: BookPromoProps) {
  const curveId = useId();

  return (
    <section className={styles.bookPromo} style={{ top, left }}>
      <div className={styles.bookImage}>
        <Image
          src={bookArt}
          alt={`The Huskeroonies - ${title}`}
          priority
          className={styles.artwork}
        />
      </div>

      <div className={styles.bookContent}>
        <div className={styles.bookBadge}>
          BOOK {bookNumber}
        </div>

        <div className={styles.bookTitle}>

          <svg viewBox="0 0 400 300" preserveAspectRatio="none">
            <defs>
              <path
                id={curveId}
                d="M 0,300 A 205,200 0 0 1 402,300"
              />
            </defs>

            <text>
              <textPath
                href={`#${curveId}`}
                startOffset="50%"
                textAnchor="middle"
              >
                {title}
              </textPath>
            </text>
          </svg>
        </div>

        <Link href={buyNowHref} className={styles.buyButton}>
          <span>BUY NOW</span>
          <span className={styles.arrow}>→</span>
        </Link>

        <button
          className={styles.cartButton}
          onClick={onAddToCart}
          type="button"
        >
          <img src={CartIcon.src} alt="Cart" /><span>ADD TO CART</span>
        </button>
      </div>
    </section>
  );
}