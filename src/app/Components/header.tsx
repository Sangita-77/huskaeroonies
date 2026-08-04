import Navbar from "./Navbar";
import Image from "next/image";
import Logo from "../Images/logo.svg";
import styles from "../page.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headercontainer}>
        <a href="/"><Image src={Logo} alt="Bridge" className={styles.logo}/></a>
        <Navbar />
      </div>
    </header>
  );
}