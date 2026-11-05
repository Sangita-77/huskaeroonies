import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "../page.module.css";
import BookIcon from "../Images/BookIcon.svg";

const links = [
  { title: "Book", href: "#book" },
  { title: "Meet The Husks", href: "#meet-the-husks" },
  { title: "For Parents", href: "#for-parents" },
  { title: "About Us", href: "#about-us" },
  { title: "Baby Shower Cart", href: "#baby-shower-cart" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className={styles.nav}>
      {/* Desktop Navigation */}
      <ul className={styles.navList}>
        {links.map(({ title, href }) => (
          <li key={href} className={styles.navItem}>
            <Image src={BookIcon} alt="" />
            <Link
              href={href}
              className={styles.navLink}
              onClick={handleLinkClick}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Burger Button */}
      <button
        type="button"
        className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <ul className={styles.mobileNavList}>
          {links.map(({ title, href }) => (
            <li key={href} className={styles.mobileNavItem}>
              <Link
                href={href}
                className={styles.mobileNavLink}
                onClick={handleLinkClick}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
