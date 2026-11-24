"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import Logo from "../Images/New/MainLogo.webp";
import styles from "../page.module.css";

interface HeaderProps {
  logo?: boolean;
}

export default function Header({ logo = true }: HeaderProps) {
  const [showLogo, setShowLogo] = useState(logo);

  useEffect(() => {
    if (logo) {
      setShowLogo(true);
      return;
    }

    const handleScroll = () => {
      setShowLogo(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [logo]);

  return (
    <header className={styles.header}>
      <div className={styles.headercontainer}>
        {showLogo && (
          <a href="/">
            <Image
              src={Logo}
              alt="Logo"
              className={styles.logo}
            />
          </a>
        )}

        <Navbar />
      </div>
    </header>
  );
}