"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import defaultBookArt from "../Images/New/SnowDayBook.webp";
import styles from "./BookPromo.module.css";
import CartIcon from "../Images/New/CartIcon.svg";
import { useRouter } from "next/navigation";


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
  const popupCurveId = useId();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();
  const positionStyles = {
    "--desktop-top": top,
    "--desktop-left": left,
    "--tablet-top": tabletTop ?? top,
    "--tablet-left": tabletLeft ?? left,
    "--mobile-top": mobileTop ?? tabletTop ?? top,
    "--mobile-left": mobileLeft ?? tabletLeft ?? left,
  } as React.CSSProperties;

  return (
    <>
      <section
        className={`${styles.bookPromo} ${styles.bookPromoDesk}`}
        style={positionStyles}
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
            <Link href={buyNowHref} className={styles.buyButton}>
              <span>READ NOW</span>
            </Link>
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

      
      <section
        className={`${styles.bookPromoMob} ${styles.bookPromo}`}
        style={positionStyles}
        onClick={() => setIsPopupOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`View ${title} book details`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsPopupOpen(true);
          }
        }}
      >
        <div className={styles.bookImage}>
          <Image
            src={bookArt}
            alt={`The Huskeroonies - ${title}`}
            priority
            className={readNow ? styles.readNowArtwork : styles.artwork}
          />
        </div>

        <div className={styles.bookContent}>
          <div className={styles.bookTitle1}>
            <span>{title}</span>
            <span className={styles.arrow}>→</span>
          </div>
        </div>
        
      </section>

      {/* Mobile Popup */}
      {isPopupOpen && (
        <div
          className={styles.popupOverlay}
          onClick={() => setIsPopupOpen(false)}
        >
          <div
            className={styles.popupContent}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} book details`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.popupClose}
              onClick={() => setIsPopupOpen(false)}
              aria-label="Close popup"
            >
              ×
            </button>

            <section
              className={`${styles.bookPromo} ${styles.popupBookPromo}`}
              style={positionStyles}
            >
              <div className={styles.bookImage}>
                <Image
                  src={bookArt}
                  alt={`The Huskeroonies - ${title}`}
                  priority
                  className={
                    readNow ? styles.readNowArtwork : styles.artwork
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
                        id={popupCurveId}
                        d="M 274.75,100 A 897.92,897.92 0 0 1 749.25,100"
                      />
                    </defs>
                    <text>
                      <textPath
                        href={`#${popupCurveId}`}
                        startOffset="50%"
                        textAnchor="middle"
                      >
                        {title}
                      </textPath>
                    </text>
                  </svg>
                </div>

                {readNow ? (
                  // <Link href={buyNowHref} className={styles.buyButton}>
                  //   <span>READ NOW</span>
                  // </Link>
                  <button type="button" className={styles.buyButton}
                    onClick={() => {
                      setIsPopupOpen(false);
                      router.push(buyNowHref);
                    }}
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
          </div>
        </div>
      )}
    </>
  );
}
