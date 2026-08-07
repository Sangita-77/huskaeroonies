import Navbar from "./Navbar";
import Image from "next/image";
import Logo from "../Images/bannerLogo.svg";
import styles from "../page.module.css";

export default function Header({ logo = true }) {
  return (
    <header className={styles.header}>
      <div className={styles.headercontainer}>
        {logo && (
          // <a href="/dev/huskaeroonies">
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