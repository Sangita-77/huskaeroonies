'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import styles from "../page.module.css";
import Header from "../Components/header";
import Footer from "../Components/footer";
import Image from "next/image";
import sampleReadWave from "../Images/sampleReadWave.webp";

const EMPTY_PAGES = [];

export default function FlipBook({ pages = EMPTY_PAGES, books = EMPTY_PAGES, bookNames = EMPTY_PAGES, initialBook = 0 }) {
  const bookCollections = useMemo(() => {
    const validBooks = Array.isArray(books)
      ? books.filter(Array.isArray).map((book) => book.filter(Boolean)).filter((book) => book.length)
      : [];
    return validBooks.length ? validBooks : [pages.filter(Boolean)];
  }, [books, pages]);
  const [activeBook, setActiveBook] = useState(() => Math.max(0, Math.min(initialBook, bookCollections.length - 1)));
  const images = bookCollections[activeBook] ?? [];
  const bookElement = useRef(null);
  const pageFlip = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [ready, setReady] = useState(false);
  const [showBuyPrompt, setShowBuyPrompt] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    setActiveBook(Math.max(0, Math.min(initialBook, bookCollections.length - 1)));
  }, [initialBook, bookCollections.length]);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function createBook() {
      const { PageFlip } = await import('page-flip');
      if (cancelled || !bookElement.current) return;

      const instance = new PageFlip(bookElement.current, {
        width: 460,
        height: 570,
        size: 'stretch',
        minWidth: 315,
        maxWidth: 520,
        minHeight: 390,
        maxHeight: 650,
        drawShadow: true,
        flippingTime: 900,
        usePortrait: false,
        autoSize: true,
        maxShadowOpacity: 0.55,
        showCover: false,
        mobileScrollSupport: false,
        swipeDistance: 24,
      });

      instance.on('flip', (event) => {
        setCurrentPage(Number(event.data));
        setShowBuyPrompt(false);
      });

      instance.loadFromHTML(bookElement.current.querySelectorAll('.pageflip-page'));
      pageFlip.current = instance;
      setReady(true);
    }

    createBook();
    return () => {
      cancelled = true;
      pageFlip.current?.destroy();
      pageFlip.current = null;
    };
  }, [images]);

  const goPrevious = () => pageFlip.current?.flipPrev();
  const goNext = () => {
    const flipBook = pageFlip.current;
    if (!flipBook) return;
    if (flipBook.getCurrentPageIndex() >= images.length - 2) {
      setShowBuyPrompt(true);
      return;
    }
    flipBook.flipNext();
  };

  const switchBook = (direction) => {
    setReady(false);
    setCurrentPage(0);
    setShowBuyPrompt(false);
    setActiveBook((book) => (book + direction + bookCollections.length) % bookCollections.length);
  };

  const handleBookClick = (event) => {
    const flipBook = pageFlip.current;
    if (!flipBook || flipBook.getCurrentPageIndex() < Math.max(0, images.length - 2)) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX > bounds.left + bounds.width / 2) setShowBuyPrompt(true);
  };

  const firstVisiblePage = Math.min(currentPage + 1, images.length);
  const secondVisiblePage = Math.min(currentPage + 2, images.length);
  
  return (
    <>
     <Header logo={true} />
      <section className={`${styles.sampleReadBanner} ${showIntro ? styles.sampleReadBannerIntro : styles.sampleReadBannerSettled}`}>
        {/* <div onClick={() => { window.location.href = "/dev/huskaeroonies/flip-book?book=1"; }} className={`${styles.Sbook} ${styles["Sbook1"]} ${activeBook === 0 ? styles.isActive : ""}`}>Snow Day</div>
        <div onClick={() => { window.location.href = "/dev/huskaeroonies/flip-book?book=2"; }} className={`${styles.Sbook} ${styles["Sbook2"]} ${activeBook === 1 ? styles.isActive : ""}`}>Big Race</div> */}
        <div onClick={() => { window.location.href = "/flip-book?book=1"; }} className={`${styles.Sbook} ${styles["Sbook1"]} ${activeBook === 0 ? styles.isActive : ""}`}>Snow Day</div>
        <div onClick={() => { window.location.href = "/flip-book?book=2"; }} className={`${styles.Sbook} ${styles["Sbook2"]} ${activeBook === 1 ? styles.isActive : ""}`}>Big Race</div>
        {/* <div className={`${styles.Sbook} ${styles["Sbook3"]}`}>Book3</div>
        <div className={`${styles.Sbook} ${styles["Sbook4"]}`}>Book4</div> */}
      </section>
    <div className={`flipbook-wrapper ${showIntro ? styles.flipbookWaiting : styles.flipbookVisible}`}>
      <div className="SampleBeforewave">
          <Image src={sampleReadWave} alt="Wave" />
        </div>
      <h2 className="book-title">
        {bookNames[activeBook] || `Book ${activeBook + 1}`}
      </h2>
      <div className="book-carousel">
        <button className="book-carousel-arrow" onClick={() => switchBook(-1)} aria-label="Previous book">‹</button>
        <div className="pageflip-stage" aria-busy={!ready} onClick={handleBookClick}>
        <div className="pageflip-book" ref={bookElement} key={activeBook}>
          {images.map((image, index) => (
            <article className="pageflip-page" key={`${image}-${index}`}>
              <div className="pageflip-content">
                <div className="page-loader" />
                <img src={image} alt={`Book page ${index + 1}`} decoding="async" />
                <span className="page-number">{index + 1}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
        <button className="book-carousel-arrow" onClick={() => switchBook(1)} aria-label="Next book">›</button>
      </div>

      {/* <div className="book-meta">
        <button className="nav-btn" onClick={goPrevious} disabled={!ready || currentPage === 0}>Previous</button>
        <span className="page-count">Pages {firstVisiblePage}–{secondVisiblePage} / {images.length}</span>
        <button className="nav-btn" onClick={goNext} disabled={!ready}>Next</button>
      </div> */}
      <div className="book-carousel-dots" aria-label="Book selection">
        {bookCollections.map((_, index) => <button key={index} className={index === activeBook ? 'is-active' : ''} onClick={() => switchBook(index - activeBook)} aria-label={`Open book ${index + 1}`} />)}
      </div>

      {showBuyPrompt && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="buy-plan-title">
          <div className="modal-card">
            <h2 id="buy-plan-title">Want to read more then buy plan</h2>
            <p>You have finished the current book preview. Upgrade your plan to keep reading.</p>
            <div className="modal-actions"><button className="primary">Buy Plan</button><button className="secondary" onClick={() => setShowBuyPrompt(false)}>Close</button></div>
          </div>
        </div>
      )}
    </div>
<Footer />
    </>
  );
}
