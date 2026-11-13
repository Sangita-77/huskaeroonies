'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useId } from "react";
import styles from "../page.module.css";
// import Header from "../Components/header";
// import Footer from "../Components/footer";
import Image from "next/image";
import sampleReadWave from "../Images/sampleReadWave.webp";
import SnowFall from './SnowFall';
// import Clouds from "../Components/Clouds";
import Leftfoot from "../Images/New/leftfoot.webp"; 
import Rightfoot from "../Images/New/rightfoot.webp"; 
import Sampleunderline from "../Images/New/sampleunderline.webp";
import Adventuretext from "../Images/New/adventure-img.webp"; 
import Sliderpageprev from "../Images/New/pageleftarrow.webp";
import Sliderpagenext from "../Images/New/pagerightarrow.webp";
import Popupfoot from "../Images/New/popupfoot.webp";
import Teddyimg from "../Images/New/teddypopupimg.webp";
import Trainimg from "../Images/New/trainpopupimg.webp";
import Swipeimg from "../Images/New/swipehand.webp";
import Fullscreenimg from "../Images/New/fullsecreen.webp";
import Link from "next/link";

const EMPTY_PAGES = [];

export default function HomeFlipBook({ pages = EMPTY_PAGES, books = EMPTY_PAGES, bookNames = EMPTY_PAGES, initialBook = 0 }) {
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({
    x: 50,
    y: 50,
  });

const handleMagnifierMove = (e) => {
  if (!isZoomed) return;

  const bounds = e.currentTarget.getBoundingClientRect();

  const x = ((e.clientX - bounds.left) / bounds.width) * 100;
  const y = ((e.clientY - bounds.top) / bounds.height) * 100;

  setMagnifierPosition({
    x: Math.max(0, Math.min(100, x)),
    y: Math.max(0, Math.min(100, y)),
  });
};


const toggleFullscreen = async () => {
  const bookWrapper = document.querySelector(".flipbook-wrapper");

  if (!bookWrapper) return;

  try {
    if (!document.fullscreenElement) {
      await bookWrapper.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.error("Fullscreen error:", error);
  }
};

useEffect(() => {
  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
    setIsZoomed(false);
  };

  document.addEventListener("fullscreenchange", handleFullscreenChange);

  return () => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
  };
}, []);


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
        width: 457.5,
        height: 522,
        size: 'stretch',
        minWidth: 130,
        maxWidth: 1457.5,
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

  const curveId = useId();

  return (
    <>
      {/* <Header logo={true} /> */}
      {/* <div className={`flipbook-wrapper ${showIntro ? styles.flipbookWaiting : styles.flipbookVisible} homePageFlipWrap`}> */}
      <div className={`flipbook-wrapper ${ showIntro ? styles.flipbookWaiting : styles.flipbookVisible } homePageFlipWrap ${isFullscreen ? "fullScreenWrap" : ""}`} >
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

        <div className="bookTitle">
          <span className='leftfoot'><Image alt="leftfoot" src={Leftfoot}/></span>
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
          <span className='rightfoot'><Image alt="leftfoot" src={Rightfoot}/></span>
        </div>
        <div className='sampleUnderline'>
          <Image alt="Sampleunderline" src={Sampleunderline}/>
        </div>
        <div className="bookSubTitle">
          <svg className="curveSubTextWrap" viewBox="120 0 790 150" preserveAspectRatio="xMidYMid meet">
            <defs>
              <path
                id="subText"
                d="M 174.75,100 A 1207.92,1207.92 0 0 1 849.25,100"
              />
            </defs>
            <text className="curveSubText">
              <textPath
                href="#subText"
                startOffset="50%"
                textAnchor="middle"
              >
                Enjoy A Little Story With Our Husky Pals
              </textPath>
            </text>
          </svg>
          </div>


        <div className="book-carousel">
          <button className="book-carousel-arrow1 bookLeftBtn1" onClick={() => switchBook(-1)} aria-label="Previous book"></button>
          <div
            className="pageflip-stage"
            aria-busy={!ready}
            onClick={handleBookClick}
            onPointerMove={handleMagnifierMove}
          >
            <div
              className="pageflip-book"
              ref={bookElement}
              key={activeBook}
            >
              {images.map((image, index) => (
                <article className="pageflip-page" key={`${image}-${index}`}>
                  <div className="pageflip-content">
                    <div className="page-loader" />
                    <img
                      src={image}
                      alt={`Book page ${index + 1}`}
                      decoding="async"
                    />
                    <span className="page-number">{index + 1}</span>
                  </div>
                </article>
              ))}
            </div>

            {isFullscreen && isZoomed && (
              <div
                className="magnifier-glass"
                style={{
                  left: `${magnifierPosition.x}%`,
                  top: `${magnifierPosition.y}%`,
                }}
              >
                <img
                  src={images[currentPage] || images[0]}
                  alt="Magnified book page"
                  style={{
                    left: `${magnifierPosition.x}%`,
                    top: `${magnifierPosition.y}%`,
                  }}
                />
              </div>
            )}
          </div>
          <button className="book-carousel-arrow1 bookRightBtn1" onClick={() => switchBook(1)} aria-label="Next book"></button>
        </div>

        <div className="book-meta">
          <button className="nav-btn" onClick={goPrevious} disabled={!ready || currentPage === 0}><Image alt="left Arrow" src={Sliderpageprev}/></button>
          <span className="page-count">Pages {firstVisiblePage}–{secondVisiblePage} / {images.length}</span>
          <button className="nav-btn" onClick={goNext} disabled={!ready}><Image alt="Right Arrow" src={Sliderpagenext}/></button>
        </div>

        <div className="FullScreen">
          <div className="swipeText"><Image alt="Swipe Icon" src={Swipeimg}/><p>Swipe to turn the page</p></div>
          <button onClick={toggleFullscreen}>
            <Image alt="Swipe Icon" src={Fullscreenimg}/>
            {isFullscreen ? "Exit Full Screen" : "Full Screen"}
          </button>
        </div>

        {isFullscreen && (
          <button
            type="button"
            className="book-zoom-btn"
            onClick={() => setIsZoomed((prev) => !prev)}
            aria-label={isZoomed ? "Hide magnifier" : "Show magnifier"}
          >
            {isZoomed ? "×" : "⌕"}
          </button>
        )}
        {/* <div className="book-carousel-dots" aria-label="Book selection">
        {bookCollections.map((_, index) => <button key={index} className={index === activeBook ? 'is-active' : ''} onClick={() => switchBook(index - activeBook)} aria-label={`Open book ${index + 1}`} />)}
      </div> */}

      <div className='adventureText'>
        <Image alt="Love the adventure" src={Adventuretext}/>
        <div className='exploreBtnWrap'>
          <a href='/flip-book'>Explore The Book</a>
        </div>
      </div>
      </div>

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
      {/* <Footer /> */}
    </>
  );
}
