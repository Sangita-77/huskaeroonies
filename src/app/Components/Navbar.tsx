import Link from "next/link";
import { useState } from "react";
import styles from "../page.module.css";

const links = [
  { title: "Book", href: "#book" },
  { title: "Meet The Husks", href: "#meet-the-husks" },
  { title: "For Parents", href: "#for-parents" },
  { title: "About Us", href: "#about-us" },
  { title: "Baby Shower Cart", href: "#baby-shower-cart" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={styles.nav}>
      {/* Desktop Navigation */}
      <ul className={styles.navList}>
        {links.map((link) => (
          <li key={link.href} className={styles.navItem}>
            <Link
              href={link.href}
              className={styles.navLink}
              onClick={handleLinkClick}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Burger Button */}
      <button
        type="button"
        className={`${styles.burger} ${
          menuOpen ? styles.burgerOpen : ""
        }`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <ul className={styles.mobileNavList}>
          {links.map((link) => (
            <li key={link.href} className={styles.mobileNavItem}>
              <Link
                href={link.href}
                className={styles.mobileNavLink}
                onClick={handleLinkClick}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}