"use client";

import { useRef } from "react";
import Image from "next/image";
import Map from "./Images/homeBanner.webp";
import Bridge from "./Images/bridge.webp";
import styles from "./page.module.css";
import Header from "./Components/header";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div
      ref={containerRef}
      className={styles.MapHolder}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      <div className={`${styles.river} ${styles["river--2"]}`}></div>
      <div className={`${styles.river} ${styles["river--3"]}`}></div>
      <Image src={Bridge} alt="Book Map" priority className={styles.Bridge} />
      <Image src={Map} alt="Book Map" priority className={styles.MapImage} />
      <div className="book1 book"><a href="/flip-book?book=1">Book 1</a></div>
      <div className="book2 book"><a href="/flip-book?book=2">Book 2</a></div>
      <div className="book3 book"><a href="/flip-book?book=3">Book 3</a></div>
      <div className="book4 book"><a href="/flip-book?book=4">Book 4</a></div>
    </div>
      <svg width="0" height="0">
    <filter id="turbulence" x="0" y="0">
      <feTurbulence baseFrequency="0.03 0.025"></feTurbulence>
      <feDisplacementMap scale="60" in="SourceGraphic"></feDisplacementMap>
    </filter>
  </svg>
    </>
  );
}

