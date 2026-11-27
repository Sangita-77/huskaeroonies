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
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book22/Big_race_page_2_resize.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book22/Bigrace_page_7_resize.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book22/Big_Race_page_9_resize.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book22/Big_Race_page_10_resize.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book22/Big _Race_page_12_resize.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book22/Big Race_page14_resize.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book22/Big_race_page_16_resize.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book22/Big_race_page_18_resize.jpg',
];

// const book3 = [
//   'https://dreamlogodesign.net/dev/animationsite/animationHtml/hanumanji.jpg',
//   'https://dreamlogodesign.net/dev/animationsite/animationHtml/hanumanji2.jpg',
//   'https://dreamlogodesign.net/dev/animationsite/animationHtml/monkey.png',
//   'https://dreamlogodesign.net/dev/animationsite/animationHtml/oroking.png',
//   'https://dreamlogodesign.net/dev/animationsite/animationHtml/shivji.jpg',
//   'https://dreamlogodesign.net/dev/animationsite/animationHtml/tawk.png',
//   'https://dreamlogodesign.net/dev/animationsite/animationHtml/ui-screensort.png',
//   'https://dreamlogodesign.net/dev/animationsite/animationHtml/admin_list.png',
// ];

const bookNames = [
  'Snow Day',
  'Big Race',
  // 'Book 3: Shivji Chronicles',
  // 'Book 4: Storybook Preview'
];


// Book 4 uses the available preview artwork until its dedicated pages are added.
const book4 = [...book2];
const books = [book1, book2];

export default async function Home({ searchParams }: { searchParams: Promise<{ book?: string }> }) {
  const params = await searchParams;
  const requestedBook = Number(params.book);
  const initialBook = Number.isInteger(requestedBook) && requestedBook > 0 ? requestedBook - 1 : 0;

  return (
    <div className={styles.scope}>
    <main className="app-shell">
      {/* <FlipBook books={books} /> */}
      {/* <FlipBook books={books} bookNames={bookNames} initialBook={initialBook} /> */}
      <FlipBook books={books} bookNames={bookNames} initialBook={0} />
    </main>
    </div>
  );
}
