import Navbar from "./Navbar";
// import Logo from "./Logo";
import styles from "../page.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headercontainer}>
        {/* <Logo /> */}
        <Navbar />
      </div>
    </header>
  );
}