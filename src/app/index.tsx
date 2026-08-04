"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import Map from "./Images/Banner.webp";
import Bridge from "./Images/bridge.svg";
import styles from "./page.module.css";
import Header from "./Components/header";
import Footer from "./Components/footer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const snowflakes = useMemo(() => Array.from({ length: 350 }, (_, index) => {
    const isMedium = index >= 250 && index < 300;
    const isLarge = index >= 300;
    return {
      id: index,
      size: isLarge ? styles.snowflakeLarge : isMedium ? styles.snowflakeMedium : "",
      style: {
        "--snow-left": `${(index * 47) % 120 - 10}%`,
        "--snow-drift": `${8 + (index * 13) % 24}px`,
        "--snow-duration": `${7 + (index * 17) % 12}s`,
        "--snow-delay": `-${(index * 29) % 19}s`,
        "--snow-opacity": `${45 + (index * 11) % 50}%`,
        "--snow-blur": `${(index % 3) - 1}px`,
      } as React.CSSProperties,
    };
  }), []);

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

  return (
    <>
    <Header/>
    <main>
    <div
      ref={containerRef}
      className={styles.MapHolder}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      <div className={`${styles.cloud} ${styles["cloud1"]}`}></div>
      <div className={`${styles.cloud} ${styles["cloud2"]}`}></div>
      <div className={`${styles.cloud} ${styles["cloud3"]}`}></div>
      <div className={`${styles.cloud} ${styles["cloud4"]}`}></div>
      <div className={`${styles.cloud} ${styles["cloud5"]}`}></div>
      <div className={`${styles.river} ${styles["river--2"]}`}></div>
      <div className={`${styles.river} ${styles["river--3"]}`}></div>
      {/**/}
      <div className={`${styles.book} ${styles["book1"]}`}><a href="/flip-book?book=1">Snow Day</a></div>
      <div className={`${styles.book} ${styles["book2"]}`}><a href="/flip-book?book=2">Big Race</a></div>
      <div className={`${styles.book} ${styles["book3"]}`}><a href="#">Neighborhood Pups</a></div>
      <div className={`${styles.book} ${styles["book4"]}`}><a href="#">Camping Day</a></div> 
      <div className={styles.SnowFall} aria-hidden="true">
        {snowflakes.map((snowflake) => (
          <span key={snowflake.id} className={`${styles.snowflake} ${snowflake.size}`} style={snowflake.style}>❄</span>
        ))}
      </div>
      <div className={styles.FireAnimation} aria-hidden="true">
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
      <Image src={Bridge} alt="Bridge" priority className={styles.Bridge} />
      <Image src={Map} alt="Book Map" priority className={styles.MapImage} />
    </div>
      <svg width="0" height="0">
    <filter id="turbulence" x="0" y="0">
      <feTurbulence baseFrequency="0.03 0.025"></feTurbulence>
      <feDisplacementMap scale="60" in="SourceGraphic"></feDisplacementMap>
    </filter>
  </svg>
  </main>
  <Footer/>
    </>
  );
}

