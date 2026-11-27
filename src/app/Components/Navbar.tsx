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
import Logo from "../Images/New/MainLogo.webp";
import WoodenPole from "../Images/New/woodenPoleimg.webp";
import Mobilegrass from "../Images/New/mobilegrass.webp";
import Mobilepups from "../Images/New/mobilepups.webp";
import mobileDropdownIconW from "../Images/New/mobilenavarrow.webp";
import mobileDropdownIconB from "../Images/New/mobilenavarrowb.webp";
import mobUserIcon from "../Images/New/mobileusericon.webp";


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
        <Link
            href={href}
            className={styles.navLink}
            onClick={handleLinkClick}
          >
            <Image src={Icon} alt="" />
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
        <a href="/"><Image src={Logo} alt="Logo" className={styles.logoM} /></a>
        <Image src={WoodenPole} alt="wooden Pole" className={styles.woodenPole} />
        <ul className={styles.mobileNavList}>
          {links.map(({ title, href, Icon }) => (
            <li key={href} className={`${styles.mobileNavItem} ${ pathname === href ? styles.active : "" }`}>
              {/* <Image src={Icon} alt="" /> */}
              <Link
                href={href}
                className={styles.mobileNavLink}
                onClick={handleLinkClick}
              >
                <Image src={Icon} alt="" />
                {title}
                <Image src={mobileDropdownIconW} className={styles.dropdownIconM} alt="Dropdown Icon" />
              </Link>
              {/* <Image src={mobileDropdownIconW} className={styles.dropdownIconM} alt="Dropdown Icon" /> */}
            </li>
          ))}
            <li className={`${styles.mobileNavItem} ${styles.mobileProfileNav}`}>
            <Image src={DogIcon} alt="DogIcon" />
              <Link href="/" className={styles.navLink} onClick={handleLinkClick} > 
                Blue & Aluna today
                <h5>Exploring the woods</h5>
              </Link>
              {/* <Image src={DropdownIconW} className={styles.dropdownIcon} alt="Dropdown Icon" /> */}
              <Link href="/" className={styles.navLink} onClick={handleLinkClick} ><Image src={mobileDropdownIconW} className={styles.dropdownIconM} alt="Dropdown Icon" /></Link>
          </li>
          <li className={`${styles.mobileNavItem} ${styles.userNav}`}>
            <Link href="/" className={styles.navLink} onClick={handleLinkClick} >
             <Image src={mobUserIcon} alt="User Icon" />
              Account 
             <Image src={mobileDropdownIconB} className={styles.dropdownIconM} alt="Dropdown Icon" />
            </Link>
          </li>
        </ul>

        <Image src={Mobilegrass} alt="Grass" className={styles.mobileGrass} />
        <Image src={Mobilepups} alt="Pups" className={styles.mobilePups} />
      </div>
    </nav>
  );
}
