"use client";
///////////////////////////////////////
import { useMemo, useRef, useState, useEffect, useId } from "react";
import { useRouter } from "next/navigation";
////////////////////////////////////////
import Image from "next/image";
import Map from "./Images/New/HomeMap.webp";
import MobileMap from "./Images/New/MobileMap.webp";
import BridgeOne from "./Images/New/BridgeOne.webp";
import BridgeTwo from "./Images/New/BridgeTwo.webp";
import Cloud1 from "./Images/cloud1.webp";
import Cloud2 from "./Images/cloud2.webp";
import Cloud3 from "./Images/cloud3.webp";
import styles from "./page.module.css";
import Header from "./Components/header";
import Footer from "./Components/footer";
import BannerLogo from "./Images/New/MainLogo.webp";
import BlueRibbon from "./Images/New/BlueRibbon.webp";
import HomeFlipBook from "./Components/HomeFlipBook";
import styless from "./flip-book/flip-book.module.css";
import BookPromo from "../app/Components/bookCard";
import NeighborhoodPups from "./Images/New/NeighborhoodPups.webp";
import TheBigRace from "./Images/New/TheBigRace.webp";
import SnowFall from "./Components/SnowFall";
import Girldog from "./Images/New/girldog.webp";
import Boydog from "./Images/New/boydog.webp";
import CampaingDayBookIcon from "./Images/New/CampaingDayBookIcon.webp";
import FireWood from "./Images/New/FireWood.webp";
import SnowDayBook from "./Images/New/SnowDayBook.webp";
import BridgeTwoM from "./Images/New/BridgeTwoM.webp";




const book1 = [
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/snow_day_page_6_resize.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/Snow_Day_page_8.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/Snow_Day_page_10.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/snow_day_page_12_resize.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/Snow_Day_page_16.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/Snow_Day_page_17.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/snow_day_page_19_resize.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/snow_day_page_27_resize.jpg',
];

const bookNames = [
  'Sample Read',
];

const bookpages = [book1];

const books = [
  { id: 1, bookNumber: "ONE", title: "Neighborhood Pups", bookArt: NeighborhoodPups, buyNowHref: "/flip-book?book=1", top: "55vw", left: "25vw", mobileTop: "132vw",},
  { id: 2, bookNumber: "TWO", title: "The Snow Day", bookArt: SnowDayBook, buyNowHref: "/flip-book?book=2", top: "36vw", left: "30vw",  mobileTop: "256vw", mobileLeft: "10vw",},
  { id: 3, bookNumber: "THREE", title: "The Big Race", bookArt: TheBigRace, buyNowHref: "/flip-book?book=3", top: "43vw", left: "80vw", mobileTop: "368vw", mobileLeft: "10vw",},
  { id: 4, bookNumber: "FOUR", title: "The Camping Day", bookArt: CampaingDayBookIcon, buyNowHref: "/flip-book?book=4", top: "70vw", left: "82vw", mobileLeft: "10vw", mobileTop: "54vw",},
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [initialBook, setInitialBook] = useState(0);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedBook = Number(params.get("book"));

    if (Number.isInteger(requestedBook) && requestedBook > 0) {
      setInitialBook(requestedBook - 1);
    }
  }, []);

  const clouds = useMemo(
  () => [
    { id: 1, image: Cloud1, style: { "--cloud-left": "-20vw", "--cloud-top": "10vw", "--cloud-delay": "-0s", "--cloud-duration": "40s" } as React.CSSProperties },
    { id: 2, image: Cloud2, style: { "--cloud-left": "-20vw", "--cloud-top": "12vw", "--cloud-delay": "-4s", "--cloud-duration": "40s" } as React.CSSProperties },
    { id: 3, image: Cloud3, style: { "--cloud-left": "-20vw", "--cloud-top": "8vw", "--cloud-delay": "-10s", "--cloud-duration": "40s" } as React.CSSProperties },
    { id: 4, image: Cloud1, style: { "--cloud-left": "-20vw", "--cloud-top": "11vw", "--cloud-delay": "-16s", "--cloud-duration": "40s" } as React.CSSProperties },
    { id: 7, image: Cloud1, style: { "--cloud-left": "-20vw", "--cloud-top": "13vw", "--cloud-delay": "-24s", "--cloud-duration": "40s" } as React.CSSProperties },
    { id: 9, image: Cloud3, style: { "--cloud-left": "-20vw", "--cloud-top": "10vw", "--cloud-delay": "-32s", "--cloud-duration": "40s" } as React.CSSProperties },
    { id: 10, image: Cloud1, style: { "--cloud-left": "-20vw", "--cloud-top": "18vw", "--cloud-delay": "-36s", "--cloud-duration": "40s" } as React.CSSProperties },
  ],
  []
);


  let isDown = false;
  let startX = 0;
  let startY = 0;
  let scrollLeft = 0;
  let scrollTop = 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown = true;
    startX = e.pageX;
    startY = e.pageY;
    scrollLeft = containerRef.current!.scrollLeft;
    scrollTop = containerRef.current!.scrollTop;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;

    const x = e.pageX - startX;
    const y = e.pageY - startY;

    containerRef.current!.scrollLeft = scrollLeft - x;
    containerRef.current!.scrollTop = scrollTop - y;
  };

  const stopDragging = () => {
    isDown = false;
  };

  // ..................PawPRINT....................

  // const router = useRouter();
  const timeoutRef = useRef<number | null>(null);
  const [activePaw, setActivePaw] = useState<"book1" | "book2" | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

const [isIOS, setIsIOS] = useState(false);

useEffect(() => {
  const isAppleDevice =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" &&
      navigator.maxTouchPoints > 1);

  setIsIOS(isAppleDevice);
}, []);
  const curveId = useId();
  //............................pawprint end ................................
  return (
    <>
     <Header logo={false} />
    <main>
    <div
      ref={containerRef}
      className={styles.MapHolder}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >

      {/* Flying birds (decorative) */}
      <div className="bird-container bird-container-one">
        <div className="bird bird-one" aria-hidden="true"></div>
      </div>
      <div className="bird-container bird-container-two">
        <div className="bird bird-two" aria-hidden="true"></div>
      </div>
      <div className="bird-container bird-container-three">
        <div className="bird bird-three" aria-hidden="true"></div>
      </div>
      <div className="bird-container bird-container-four">
        <div className="bird bird-four" aria-hidden="true"></div>
      </div>
      <div className={styles.frontCloudLayer} aria-hidden="true">
        <div className={styles.cloud} style={clouds[0].style}>
          <Image src={clouds[0].image} alt="cloud" className={styles.cloudImage} priority />
        </div>
      </div>
      <div className={styles.cloudRow} aria-hidden="true">
        {clouds.slice(1).map((cloud) => (
          <div key={cloud.id} className={styles.cloud} style={cloud.style}>
            <Image src={cloud.image} alt="cloud" className={styles.cloudImage} priority={false} />
          </div>
        ))}
      </div>
      {/* River Start */}
      <div className={`${styles.river} ${styles["river--2"]}`}></div>
      <div className={`${styles.river} ${styles["river--3"]}`}></div>
      <div className={`${styles.river} ${styles["river--4"]}`}></div>
      {/* River End */}
      
      {/* /////////////////////////////////////// */}
      {/* <div className={`${styles.book} ${styles["book1"]}`}><a href="/dev/huskaeroonies/flip-book?book=1">Snow Day</a></div> */}
      {/* <div className={`${styles.book} ${styles["book1"]}`}>
        <a href="/flip-book?book=1" onClick={handleBookClick(1, "/flip-book?book=1")}>Snow Day</a>
      </div> */}
      {/* <div className={`${styles.book} ${styles["book2"]}`}><a href="/dev/huskaeroonies/flip-book?book=2">Big Race</a></div> */}
      {/* <div className={`${styles.book} ${styles["book2"]}`}>
        <a href="/flip-book?book=2" onClick={handleBookClick(2, "/flip-book?book=2")}>Big Race</a>
      </div> */}
      <div className={styles.booksContainer}>
        {books.map((book) => (
          <BookPromo
            key={book.id}
            {...book}
            onAddToCart={() => {
              console.log("Added:", book.title);
            }}
          />
        ))}
      </div> 
      <div className={styles.SnowFall} aria-hidden="true">
        <SnowFall count={200} className="homepageSnow" />
      </div>
      <Image alt="FireWood" src={FireWood} className={styles.FireWood}/>
      <div className={styles.FireAnimation} aria-hidden="true">
    <div className={styles.smoke_holder}>
      <span></span><span></span><span></span><span></span><span></span><span></span>
    </div>
        <div className={styles.fire}>
          <div className={styles.fireLeft}>
            <div className={styles.mainFire} />
            <div className={styles.particleFire} />
          </div>
          <div className={styles.fireCenter}>
            <div className={styles.mainFire} />
            <div className={styles.particleFire} />
          </div>
          <div className={styles.fireRight}>
            <div className={styles.mainFire} />
            <div className={styles.particleFire} />
          </div>
          <div className={styles.fireBottom}>
            <div className={styles.mainFire} />
          </div>
        </div>
      </div>
      <Image src={BannerLogo} alt="Bridge" priority className={styles.BannerLogo} />
      <Image src={BlueRibbon} alt="Bridge" priority className={styles.BlueRibbon} />
      <div className={styles.Welcome}>         
        <svg className="curved-text" viewBox="120 0 790 150" preserveAspectRatio="none" >
          <defs> <path id={curveId} d="M 274.75,100 A 897.92,897.92 0 0 1 749.25,100" /> </defs>
          <text> 
            <textPath href={`#${curveId}`} startOffset="50%">
              Welcome to Huskyville!
            </textPath> 
          </text>
        </svg>
        </div>
       <div className={styles.PickAdv}>         
        <svg className="curved-text" viewBox="120 0 790 150" preserveAspectRatio="none" >
          <defs> <path id={curveId} d="M 274.75,100 A 897.92,897.92 0 0 1 749.25,100" /> </defs>
          <text> 
            <textPath href={`#${curveId}`} startOffset="50%">
              Pick An Adventure And Start Reading
            </textPath> 
          </text>
        </svg>
        </div>
       <Image src={BridgeOne} alt="Bridge" priority className={styles.BridgeOne} />
       <Image src={BridgeTwo} alt="Bridge" priority className={styles.BridgeTwo} />

      <Image src={BridgeTwoM} alt="Bridge1" priority className={styles.mobileBridge1} />
      <Image src={BridgeTwoM} alt="Bridge2" priority className={styles.mobileBridge2} />

      <Image src={Map} alt="Book Map" priority className={styles.MapImage} />
      {/* <Image src={Map} alt="Book Map" priority className={`${styles.MapImage} ${styles.desktopMap}`} /> */}

      <Image src={MobileMap} alt="Book Map" priority className={styles.mobileMap} />
      {/* <Image src={MobileMapOverlay} alt="Book Map" priority className={`${styles.mobileMap} ${styles.mobileMapOverlay}`} /> */}
    </div>
      <svg width="0" height="0">
    <filter id="turbulence" x="0" y="0">
      <feTurbulence baseFrequency="0.03 0.025"></feTurbulence>
      <feDisplacementMap scale="60" in="SourceGraphic"></feDisplacementMap>
    </filter>
  </svg> 

  <div className="homePageFlip">
  <div className={styless.scope}>
    <div className="app-shell">
      <HomeFlipBook books={bookpages} bookNames={bookNames} initialBook={initialBook} />
    </div>
  </div>
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
  </main>
  <Footer/>
    </>
  );
}

