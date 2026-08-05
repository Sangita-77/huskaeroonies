"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import styles from "../page.module.css";

// const links = [
//   // { title: "Book", href: ROUTES.BOOK },
//   { title: "Book", href: "#" },
//   { title: "Meet The Husks", href: "#" },
//   { title: "For Parents", href: "#" },
//   { title: "About Us", href: "#" },
//   { title: "Baby Shower Cart", href: "#" },
// ];

const links = [
  { title: "Book", href: "#book" },
  { title: "Meet The Husks", href: "#meet-the-husks" },
  { title: "For Parents", href: "#for-parents" },
  { title: "About Us", href: "#about-us" },
  { title: "Baby Shower Cart", href: "#baby-shower-cart" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {links.map((link) => (
          <li key={link.href} className={styles.navItem}>
            <Link
              href={link.href}
              className={`${styles.navLink} ${
                pathname === link.href ? styles.active : ""
              }`}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}