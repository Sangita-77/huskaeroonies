
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useId } from "react";
import defaultBookArt from "../Images/New/SnowDayBook.webp";
import styles from "./BookPromo.module.css";
import CartIcon from "../Images/New/CartIcon.svg";


interface BookPromoProps {
  bookArt?: StaticImageData | string;
  bookNumber: string;
  title: string;
  buyNowHref?: string;
  top?: string;
  left?: string;
  mobileTop?: string;
  mobileLeft?: string;
  tabletTop?: string;
  tabletLeft?: string;
  onAddToCart?: () => void;
  readNow?: boolean;
}


export default function BookPromo({
  bookArt = defaultBookArt,
  bookNumber,
  title,
  buyNowHref = "/shop",
  top = "0vw",
  left = "0vw",
  mobileTop,
  mobileLeft,
  tabletTop,
  tabletLeft,
  onAddToCart,
  readNow = false,
}: BookPromoProps) {
  const curveId = useId();

  return (
    <section
        className={styles.bookPromo}
        style={{
          "--desktop-top": top,
          "--desktop-left": left,
          "--tablet-top": tabletTop ?? top,
          "--tablet-left": tabletLeft ?? left,
          "--mobile-top": mobileTop ?? tabletTop ?? top,
          "--mobile-left": mobileLeft ?? tabletLeft ?? left,
        } as React.CSSProperties}
    >
      <div className={styles.bookImage}>
        <Image
          src={bookArt}
          alt={`The Huskeroonies - ${title}`}
          priority
            className={
              readNow
                ? styles.readNowArtwork
                : styles.artwork
            }
        />
      </div>

      <div className={styles.bookContent}>
        <div className={styles.bookBadge}>
          BOOK {bookNumber}
        </div>

        <div className={styles.bookTitle}>
          <svg viewBox="120 0 780 150" preserveAspectRatio="none">
            <defs>
              <path
                id={curveId}
                d="M 274.75,100 A 897.92,897.92 0 0 1 749.25,100"
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

        {readNow ? (
          <button
            className={styles.cartButton}
            onClick={onAddToCart}
            type="button"
          >
            <span>READ NOW</span>
          </button>
        ) : (
          <>
            <Link href={buyNowHref} className={styles.buyButton}>
              <span>BUY NOW</span>
              <span className={styles.arrow}>→</span>
            </Link>

            <button
              className={styles.cartButton}
              onClick={onAddToCart}
              type="button"
            >
              <img src={CartIcon.src} alt="Cart" />
              <span>ADD TO CART</span>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
