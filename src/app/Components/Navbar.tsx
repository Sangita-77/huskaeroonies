"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import styles from "../page.module.css";

const links = [
  { title: "Book", href: ROUTES.BOOK },
  { title: "Meet The Husks", href: ROUTES.HOME },
  { title: "For Parents", href: ROUTES.FORPARENTS },
  { title: "About Us", href: ROUTES.ABOUTUS },
  { title: "Baby Shower Cart", href: ROUTES.CART },
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