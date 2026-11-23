
'use client';

import { useEffect, useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import styles from './Modal.module.css';
import sampleunderline from '../Images/New/sampleunderline.webp';


type PopupImage = ImageProps['src'];

interface AdventurePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuySeries: () => void;
  onBuyAnnual: () => void;
  assets: {
    logo: PopupImage;
    leftDog: PopupImage;
    rightDog: PopupImage;
    bookSeries: PopupImage;
    annualPass: PopupImage;
    bookIcon: PopupImage;
    heartIcon: PopupImage;
    screenIcon: PopupImage;
    calendarIcon: PopupImage;
  };
}

const AdventurePlanModal: React.FC<AdventurePlanModalProps> = ({
  isOpen,
  onClose,
  onBuySeries,
  onBuyAnnual,
  assets,
}) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  // Open and close animation state
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  // Close with Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Detect closing animation completion
    const handleAnimationEnd = (
    event: React.AnimationEvent<HTMLDivElement>
    ) => {
    if (
        event.target === event.currentTarget &&
        isOpen === false
    ) {
        setShouldRender(false);
    }
    };

  // Render condition
  if (!shouldRender) return null;


  return (
        <div
        className={`${styles.popupOverlay} ${
            isOpen ? styles.popupOpen : styles.popupClosing
        }`}
        onClick={onClose}
        onAnimationEnd={handleAnimationEnd}
        role="presentation"
        >
        <div
        className={styles.popupContainer}
        role="dialog"
        aria-modal="true"
        aria-labelledby="adventure-popup-title"
        onClick={(event) => event.stopPropagation()}
        >
        {/* Header */}
        <div className={styles.popupHeader}>
          <Image
            src={assets.logo}
            alt="Huskaeroonies"
            className={styles.logo}
          />
          <Image
            src={sampleunderline}
            alt="Huskaeroonies"
            className={styles.sampleunderline}/>


            <div className='buyPlanTitle'>
              <svg viewBox="120 0 790 150" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <path
                    id="popText"
                    d="M 174.75,100 A 1207.92,1207.92 0 0 1 849.25,100"
                  />
                </defs>
                <text>
                  <textPath href="#popText" startOffset="50%" textAnchor="middle" >
                    Keep the adventure going!
                  </textPath>
                </text>
              </svg>
            </div>
            <h4>Loved the preview? Choose what comes next.</h4>
        </div>

        {/* Husky Characters */}
        <Image
          src={assets.leftDog}
          alt=""
          className={styles.leftDog}
        />

        <Image
          src={assets.rightDog}
          alt=""
          className={styles.rightDog}
        />

        {/* Plans */}
        <div className={styles.plansWrapper}>

          {/* Everyday Adventures */}
          <div className={`${styles.planCard} ${styles.seriesCard}`}>
            <div className={styles.planImage}>
              <Image
                src={assets.bookSeries}
                alt="Everyday Adventures book series"
              />
            </div>

            <h3>Everyday Adventures Series</h3>

            <div className={styles.priceWrap}>
              <span className={styles.price}>$50</span>
              <span className={styles.priceDescription}>
                One-Time<br />Purchase
              </span>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <Image src={assets.bookIcon} alt="" />
                <span>All 5 Books In The Series</span>
              </div>

              <div className={styles.feature}>
                <Image src={assets.heartIcon} alt="" />
                <span>Adventures To Enjoy Together</span>
              </div>
            </div>

            <button
              type="button"
              className={`${styles.planButton} ${styles.seriesButton}`}
              onClick={onBuySeries}
            >
              BUY THE 5-BOOK SERIES
              <span>→</span>
            </button>
          </div>

          {/* Annual Adventure Pass */}
          <div className={`${styles.planCard} ${styles.annualCard}`}>
            <div className={styles.annualBadge}>
              A YEAR OF ADVENTURE
            </div>

            <div className={styles.planImage}>
              <Image
                src={assets.annualPass}
                alt="Annual Adventure Pass"
              />
            </div>

            <h3>Annual Adventure Pass</h3>

            <div className={styles.priceWrap}>
              <span className={styles.price}>$99.99</span>
              <span className={styles.priceDescription}>
                For One<br />Year
              </span>
            </div>

            <div className={styles.features}>
              <div className={styles.feature}>
                <Image src={assets.screenIcon} alt="" />
                <span>Access Every Huskeroonies Adventure</span>
              </div>

              <div className={styles.feature}>
                <Image src={assets.calendarIcon} alt="" />
                <span>Get A Year Of Adventures</span>
              </div>
            </div>

            <button
              type="button"
              className={`${styles.planButton} ${styles.annualButton}`}
              onClick={onBuyAnnual}
            >
              GET A YEAR OF ADVENTURES
              <span>→</span>
            </button>
          </div>

        </div>

        {/* Maybe Later */}
        <button
          type="button"
          className={styles.maybeLater}
          onClick={onClose}
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
};

export default AdventurePlanModal;
