
import FlipBook from '../Components/FlipBook';
import styles from "./flip-book.module.css";

import SnowDayPage1 from "../Images/Books/snow_day_1.webp";
import SnowDayPage2 from "../Images/Books/snow_day_2.webp";
import SnowDayPage3 from "../Images/Books/snow_day_3.webp";
import SnowDayPage4 from "../Images/Books/snow_day_4.webp";
import SnowDayPage5 from "../Images/Books/snow_day_5.webp";
import SnowDayPage6 from "../Images/Books/snow_day_6.webp";
import SnowDayPage7 from "../Images/Books/snow_day_7.webp";
import SnowDayPage8 from "../Images/Books/snow_day_8.webp";

const book1 = [
  SnowDayPage1.src,
  SnowDayPage2.src,
  SnowDayPage3.src,
  SnowDayPage4.src,
  SnowDayPage5.src,
  SnowDayPage6.src,
  SnowDayPage7.src,
  SnowDayPage8.src,
];

const book2 = [
  "https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book22/Big_race_page_2_resize.jpg",
  "https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book22/Bigrace_page_7_resize.jpg",
  "https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book22/Big_Race_page_9_resize.jpg",
  "https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book22/Big_Race_page_10_resize.jpg",
  "https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book22/Big _Race_page_12_resize.jpg",
  "https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book22/Big Race_page14_resize.jpg",
  "https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book22/Big_race_page_16_resize.jpg",
  "https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book22/Big_race_page_18_resize.jpg",
];

const books = [book1, book2];

const bookNames = [
  "Snow Day",
  "Big Race",
];

type HomeProps = {
  searchParams: Promise<{
    book?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const requestedBook = Number(params.book);

  const initialBook =
    Number.isInteger(requestedBook) &&
    requestedBook >= 1 &&
    requestedBook <= books.length
      ? requestedBook - 1
      : 0;

  return (
    <div className={styles.scope}>
      <main className="app-shell">
        <FlipBook
          books={books}
          bookNames={bookNames}
          initialBook={initialBook}
        />
      </main>
    </div>
  );
}
