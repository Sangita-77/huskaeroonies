import styles from "../footer.module.css";
import Image from "next/image";
// import Footerlogo from "../Images/bannerLogo.svg";
import Footerlogo from "../Images/New/footerlogo.webp";
// import FooterDogs from "../Images/footerDogs.webp";
import FooterDogs from "../Images/New/footerdogsnew.webp";
import FooterBeforewave from "../Images/footer-before.webp";
import FooterTopBeforewave from "../Images/footer-topbefore.webp";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";
import HomeIcon from "../Images/home-icon01.svg";
import BookIcon from "../Images/book-icon01.svg";
import FavoriteIcon from "../Images/favorite-icon01.svg";
import ProfileIcon from "../Images/profile-icon01.svg";
import ExploreIcon from "../Images/New/exploreicon.svg";
import ParentIcon from "../Images/New/forparenticon.svg";
import YoutubeIcon from "../Images/New/youtubeicon.svg";
import FacebbokIcon from "../Images/New/Facebookicon.svg";
import InstaIcon from "../Images/New/Instagramicon.svg";

const exploreLinks = [
  { title: "All Books", href: "#book" },
  { title: "New Releases", href: "#new-releases" },
  { title: "Book Collections", href: "#book-collections" },
];

const parentLinks = [
  { title: "Why Huskeroonies", href: "#why-huskaeroonies" },
  { title: "Parent Resources", href: "#parent-resources" },
  { title: "FAQs", href: "#faqs" },
];

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");

  return (
    <>
      {/* <section className={styles.footerTopSection}>
        <div className={styles.footerTopbeforeWave}>
          <Image src={FooterTopBeforewave} alt="Footer blue Wave" />
        </div>
        <div className={styles.footerTopSectionContainer}>
          <div className={styles.row}>
            <div className={styles.footerTopCol}>
              <Image src={HomeIcon} alt="Home Icon" />
              <h4>Home</h4>
            </div>
            <div className={styles.footerTopCol}>
              <Image src={BookIcon} alt="Home Icon" />
              <h4>My Books</h4>
            </div>
            <div className={styles.footerTopCol}>
              <Image src={FavoriteIcon} alt="Home Icon" />
              <h4>Favorites</h4>
            </div>
            <div className={styles.footerTopCol}>
              <Image src={ProfileIcon} alt="Home Icon" />
              <h4>Profile</h4>
            </div>
          </div>
        </div>
      </section> */}

      <footer className={styles.footerWrap}>
        {/* <div className={styles.beforeWave}>
          <Image src={FooterBeforewave} alt="Footer Wave" />
        </div> */}
        <div className={styles.footerWrapcontainer}>
          <div className={styles.footerBottom}>
            <div className={styles.row}>

              <div className={styles.footerBottomLeft}>
                <div className={styles.footerLogoWrap}>
                  <a href="/dev/huskaeroonies"><Image src={Footerlogo} alt="Footer Logo" /></a>
                  <a href="/dev/huskaeroonies"><Image src={FooterDogs} alt="Footer Dogs" /></a>
                </div>
              </div>

              <div className={styles.footerBottomCenter}>
                <div className={styles.footerBottomCenterCol}>
                  <div className={styles.footerTitleWrap}>
                    <Image src={ExploreIcon} alt="Home Icon" style={{ width: 32, height: 32 }} />
                    <h3>Explore</h3>
                  </div>
                  <ul className={styles.navList}>
                    {exploreLinks.map((link) => (
                      <li key={link.href} className={styles.navItem}>
                        <Link
                          href={link.href}
                          className={`${styles.navLink} ${pathname === link.href ? styles.active : ""
                            }`}
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.footerBottomCenterCol}>
                  <div className={styles.footerTitleWrap}>
                    <Image src={ParentIcon} alt="Home Icon" style={{ width: 32, height: 32 }} />
                    <h3>For Parents</h3>
                  </div>
                  <ul className={styles.navList}>
                    {parentLinks.map((link) => (
                      <li key={link.href} className={styles.navItem}>
                        <Link
                          href={link.href}
                          className={`${styles.navLink} ${pathname === link.href ? styles.active : ""
                            }`}
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.footerBottomRight}>
                <div className={styles.newsletterWrap}>
                  <h3>Join the Pack!</h3>
                  <p>Get updates, new books, and special offers.</p>
                  <form className={styles.form} >
                    <input type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={styles.input}
                    />
                    <button type="submit" className={styles.button}> Send </button>
                  </form>
                </div>
              </div>

            </div>
          </div>

        </div>
        <div className={styles.footerBottomWrap}>
          <div className={styles.footerBottomContainer}>
            <div className={styles.copyrightText}>
              <p><span>© 2026 Huskeroonies. All rights reserved.</span> <a href="#" className="bottomLink">Teams & Conditions</a> <a href="#" className="bottomLink">Privacy Policy</a> </p>
            </div>
            <div className={styles.socialMedialinks}>
              <a href="https://youtube.com/" target="_blank"><Image src={YoutubeIcon} alt="Youtube Icon"/></a>
              <a href="https://www.facebook.com/" target="_blank"><Image src={FacebbokIcon} alt="Facebook Icon"/></a>
              <a href="https://www.instagram.com/" target="_blank"><Image src={InstaIcon} alt="Insta Icon"/></a>
            </div>
          </div>
        </div>
      </footer>
    <div>

    </div>
    </>
  );
}