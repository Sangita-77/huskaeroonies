'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useId } from "react";
import styles from "../page.module.css";
import Header from "./header";
import Footer from "./footer";
import Image from "next/image";
import SnowFall from './SnowFall';
import Clouds from "./Clouds";
import Girldog from "../Images/New/girldog.webp";
import Boydog from "../Images/New/boydog.webp";
import BookPromo from "../Components/bookCard";
import NeighborhoodPups from "../Images/New/NeighborhoodPups.webp";
import TheBigRace from "../Images/New/TheBigRace.webp";
import SnowDayBook from "../Images/New/SnowDayBook.webp";
import CampaingDayBookIcon from "../Images/New/CampaingDayBookIcon.webp";
import Sliderpageprev from "../Images/New/pageleftarrow.webp";
import Sliderpagenext from "../Images/New/pagerightarrow.webp";
import Popupfoot from "../Images/New/popupfoot.webp";
import Teddyimg from "../Images/New/teddypopupimg.webp";
import Trainimg from "../Images/New/trainpopupimg.webp";


const EMPTY_PAGES = [];

const booksmap = [
  { id: 2, bookNumber: "TWO", title: "The Snow Day", bookArt: SnowDayBook, buyNowHref: "/flip-book?book=2", top: "20vw", left: "51vw", readNow: true},
  { id: 3, bookNumber: "THREE", title: "The Big Race", bookArt: TheBigRace, buyNowHref: "/flip-book?book=3", top: "28vw", left: "80vw", readNow: true},
  { id: 4, bookNumber: "FOUR", title: "The Camping Day", bookArt: CampaingDayBookIcon, buyNowHref: "/flip-book?book=4", top: "24vw", left: "12vw", readNow: true},
];

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
  const activeBookNumber = booksmap[activeBook]?.bookNumber || "";

  useEffect(() => {
    setActiveBook(Math.max(0, Math.min(initialBook, bookCollections.length - 1)));
  }, [initialBook, bookCollections.length]);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 1000);
    return () => window.clearTimeout(timer);
  }, []);

useEffect(() => {
  let cancelled = false;
  let instance;

  async function createBook() {
    if (!bookElement.current || images.length === 0) {
      setReady(false);
      return;
    }

    setReady(false);

    try {
      const { PageFlip } = await import("page-flip");

      if (cancelled || !bookElement.current) return;

      const isMobile = window.matchMedia(
        "(max-width: 767px)"
      ).matches;

      const element = bookElement.current;

      instance = new PageFlip(element, {
        width: 457.5,
        height: 522,
        size: 'stretch',
        minWidth: 130,
        maxWidth: 1427.5,
        minHeight: 140,
        maxHeight: 1522,
        drawShadow: true,
        flippingTime: 900,
        usePortrait: false,
        autoSize: true,
        maxShadowOpacity: 0.55,
        showCover: false,
        mobileScrollSupport: true,
        swipeDistance: 24,
      });

      instance.on("flip", (event) => {
        setCurrentPage(Number(event.data));
        setShowBuyPrompt(false);
      });

      instance.loadFromHTML(
        element.querySelectorAll(".pageflip-page")
      );

      if (cancelled) {
        instance.destroy();
        return;
      }

      pageFlip.current = instance;
      setReady(true);
    } catch (error) {
      console.error("Failed to initialize FlipBook:", error);
      setReady(false);
    }
  }

  createBook();

  return () => {
    cancelled = true;

    instance?.destroy();

    if (pageFlip.current === instance) {
      pageFlip.current = null;
    }
  };
}, [activeBook, images.length]);


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

  const curveId = useId();

  return (
    <>
      <Header logo={true} />
      <section className={`${styles.sampleReadBanner} ${showIntro ? styles.sampleReadBannerIntro : styles.sampleReadBannerSettled}`}>
        <Clouds />
        <div className={styles.booksContainer}>
          {booksmap.map((book) => (
            <BookPromo
              key={book.id}
              {...book}
              onAddToCart={() => {
                console.log("Added:", book.title);
              }}
            />
          ))}
        </div> 
        <div>
           <SnowFall count={100}  className={styles.FlipSnowFall}/>
        </div>
      </section>
      <div className={`flipbook-wrapper ${showIntro ? styles.flipbookWaiting : styles.flipbookVisible} flipbookPage`}>
        {activeBook === 0 && <SnowFall count={100} />}
        {/* <div className="SampleBeforewave">
          <Image src={sampleReadWave} alt="Wave" />
        </div> */}
        {/* <h2 className="book-title">
          {bookNames[activeBook] || `Book ${activeBook + 1}`}
        </h2> */}
        <div className="totalPageNoWrap">
          <div className="totalPageNo">
            <span>{images.length}</span> Pages
          </div>
        </div>
        <div className={styles.bookBadge}>
          BOOK {activeBookNumber}
        </div>
        <div className="bookTitle">
          <svg className="curveTextWrap" viewBox="120 0 790 150" preserveAspectRatio="xMidYMid meet">
            <defs>
              <path
                id={curveId}
                d="M 274.75,100 A 897.92,897.92 0 0 1 749.25,100"
              />
            </defs>

            <text className="curveText">
              <textPath
                href={`#${curveId}`}
                startOffset="50%"
                textAnchor="middle"
              >
                {bookNames[activeBook] || `Book ${activeBook + 1}`}
              </textPath>
            </text>
          </svg>
        </div>

        <div className="book-carousel">
          {/* <button className="book-carousel-arrow bookLeftBtn" onClick={() => switchBook(-1)} aria-label="Previous book">‹</button> */}
          <button className="book-carousel-arrow bookLeftBtn" onClick={() => switchBook(-1)} aria-label="Previous book">
            <Image alt="Right Arrow" src={Sliderpageprev}/>
          </button>
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
          {/* <button className="book-carousel-arrow bookRightBtn" onClick={() => switchBook(1)} aria-label="Next book">›</button> */}
          <button className="book-carousel-arrow bookRightBtn" onClick={() => switchBook(1)} aria-label="Next book">
            <Image alt="Right Arrow" src={Sliderpagenext}/>
          </button>
        </div>

        {/* <div className="book-meta">
          <button className="nav-btn" onClick={goPrevious} disabled={!ready || currentPage === 0}>Previous</button>          
          <span className="page-count">
            <span className="desktop-page-count">
              Pages {firstVisiblePage}–{secondVisiblePage} / {images.length}
            </span>
            <span className="mobile-page-count">
              Page {Math.min(currentPage + 1, images.length)} / {images.length}
            </span>
          </span>          
          <button className="nav-btn" onClick={goNext} disabled={!ready}>Next</button>
        </div> */}
        <div className="book-meta">
          <button className="nav-btn" onClick={goPrevious} disabled={!ready || currentPage === 0}><Image alt="left Arrow" src={Sliderpageprev}/></button>
          <span className="page-count">Pages {firstVisiblePage}–{secondVisiblePage} / {images.length}</span>
          <button className="nav-btn" onClick={goNext} disabled={!ready}><Image alt="Right Arrow" src={Sliderpagenext}/></button>
        </div>

        {/* <div className="book-carousel-dots" aria-label="Book selection">
        {bookCollections.map((_, index) => <button key={index} className={index === activeBook ? 'is-active' : ''} onClick={() => switchBook(index - activeBook)} aria-label={`Open book ${index + 1}`} />)}
      </div> */}
      </div>

      <div className={styles.heroVideoContainer}>
        <Image src={Girldog} alt="Girldog" priority className={styles.GirlDog} />
        {/* <video key={`girl-${isIOS ? "ios" : "other"}`} className={styles.GirlDog} autoPlay muted loop playsInline preload="auto" >
          <source
            src={
              isIOS
                ? "https://dreamlogodesign.net/dev/animationsite/animationHtml/girlDog.mov"
                : "https://dreamlogodesign.net/dev/animationsite/animationHtml/girlDog.webm"
            }
            type={isIOS ? "video/quicktime" : "video/webm"}
          />
        </video> */}

        <Image src={Boydog} alt="Girldog" priority className={styles.BoyDog} />
        {/* <video key={`boy-${isIOS ? "ios" : "other"}`} className={styles.BoyDog} autoPlay muted loop playsInline preload="auto" >
          <source
            src={
              isIOS
                ? "https://dreamlogodesign.net/dev/animationsite/animationHtml/boyDog.mov"
                : "https://dreamlogodesign.net/dev/animationsite/animationHtml/boyDog.webm"
            }
            type={isIOS ? "video/quicktime" : "video/webm"}
          />
        </video> */}
      </div>

      {/* {showBuyPrompt && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="buy-plan-title">
          <div className="modal-card">
            <h2 id="buy-plan-title">Want to read more then buy plan</h2>
            <p>You have finished the current book preview. Upgrade your plan to keep reading.</p>
            <div className="modal-actions"><button className="primary">Buy Plan</button><button className="secondary" onClick={() => setShowBuyPrompt(false)}>Close</button></div>
          </div>
        </div>
      )} */}
      {showBuyPrompt && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="buy-plan-title">
          <div className="modal-card">
            <Image className="footImg" alt="" src={Popupfoot}/>
            {/* <h2 id="buy-plan-title">Want to read more then buy plan</h2> */}
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
                    Want to read more then buy plan
                  </textPath>
                </text>
              </svg>
            </div>
            <p>You have finished the current book preview. Upgrade your plan to keep reading.</p>
            <div className="modal-actions"><button className="primary">Buy Plan</button><button className="secondary" onClick={() => setShowBuyPrompt(false)}>Close</button></div>
            <Image className="teddyImg" alt="Teddy" src={Teddyimg}/>
            <Image className="TrainImg" alt="Train" src={Trainimg}/>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
