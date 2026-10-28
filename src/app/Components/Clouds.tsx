"use client";

import Image from "next/image";
import { useMemo } from "react";
import styles from "./Clouds.module.css";

import Cloud1 from "../Images/cloud1.webp";
import Cloud2 from "../Images/cloud2.webp";
import Cloud3 from "../Images/cloud3.webp";

export default function Clouds() {
  const clouds = useMemo(
    () => [
      { id: 1, image: Cloud1, top: "10%", delay: "-5s" },
      { id: 2, image: Cloud2, top: "20%", delay: "-15s" },
      { id: 3, image: Cloud3, top: "25%", delay: "-25s" },
      { id: 4, image: Cloud1, top: "15%", delay: "-35s" },
    ],
    []
  );

  return (
    <>
      {/* Moving Clouds */}
      <div className={styles.cloudContainer} aria-hidden="true">
        {clouds.map((cloud) => (
          <div
            key={cloud.id}
            className={styles.cloud}
            style={
              {
                "--cloud-top": cloud.top,
                "--cloud-delay": cloud.delay,
              } as React.CSSProperties
            }
          >
            <Image
              src={cloud.image}
              alt=""
              className={styles.cloudImage}
            />
          </div>
        ))}
      </div>

      {/* Flying Birds */}
      <div className={styles.birdsContainer} aria-hidden="true">
        {/* <div className={`${styles.birdContainer} ${styles.birdOne}`}>
          <div className={styles.bird} />
        </div> */}

        <div className={`${styles.birdContainer} ${styles.birdTwo}`}>
          <div className={styles.bird} />
        </div>

        <div className={`${styles.birdContainer} ${styles.birdThree}`}>
          <div className={styles.bird} />
        </div>

        <div className={`${styles.birdContainer} ${styles.birdFour}`}>
          <div className={styles.bird} />
        </div>
      </div>
    </>
  );
}