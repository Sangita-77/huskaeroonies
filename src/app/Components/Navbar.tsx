import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "../page.module.css";

import BookIcon from "../Images/New/BookIcon.webp";
import ShowIcon from "../Images/New/ShowIcon.webp";
import ShopIcon from "../Images/New/ShopIcon.webp";
import BetterMeIcon from "../Images/New/BetterMeIcon.webp";
import DogIcon from "../Images/New/DogIcon.webp";
import UserIcon from "../Images/New/navusericon.svg";
import DropdownIconW from "../Images/New/dropdowniconwhite.svg";
import DropdownIconB from "../Images/New/dropdowniconblack.svg";


const links = [
  { title: "Book", href: "/flip-book", Icon: BookIcon },
  { title: "Show", href: "#meet-the-husks", Icon: ShowIcon },
  { title: "Shop", href: "#for-parents", Icon: ShopIcon },
  { title: "Better Me", href: "#about-us", Icon: BetterMeIcon },
  // { title: "Baby Shower Cart", href: "#baby-shower-cart", Icon: CartIcon },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className={styles.nav}>
      {/* Desktop Navigation */}
      <ul className={styles.navList}>
        {links.map(({ title, href, Icon }) => (
        <li
          key={href}
          className={`${styles.navItem} ${
            pathname === href ? styles.active : ""
          }`}
        >
          <Image src={Icon} alt="" />
          <Link
            href={href}
            className={styles.navLink}
            onClick={handleLinkClick}
          >
            {title}
          </Link>
        </li>
        ))}
        <li className={`${styles.navItem} ${styles.ProfileNav}`}>
          <Image src={DogIcon} alt="DogIcon" />
            <Link
              href="/"
              className={styles.navLink}
              onClick={handleLinkClick}
            >
             Blue & Aluna today
             <h5>Exploring the woods</h5>
            </Link>
            <Image src={DropdownIconB} className={styles.dropdownIcon} alt="Dropdown Icon" />
        </li>
        <li className={`${styles.navItem} ${styles.userNav}`}>
          <Image src={UserIcon} alt="User Icon" />
            <Link
              href="/"
              className={styles.navLink}
              onClick={handleLinkClick}
            >
             Account
            </Link>
            <Image src={DropdownIconW} className={styles.dropdownIcon} alt="Dropdown Icon" />
        </li>
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
              {/* <Image src={Icon} alt="" /> */}
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
