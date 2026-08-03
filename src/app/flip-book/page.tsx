import FlipBook from '../components/FlipBook';
import styles from "./flip-book.module.css";

const book1 = [
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/snow_day_page_6_resize.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/Snow_Day_page_8.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/Snow_Day_page_10.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/snow_day_page_12_resize.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/snow_day_page_19_resize.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/snow_day_page_27_resize.jpg',
  // 'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book1/Snow_Day_page_19.jpg',
  // 'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book1/Snow_Day_page_27.JPG',
];

const book2 = [
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book2/Big_race_page_2.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book2/Big_race_page_7.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book2/Big_Race_page_9.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book2/Big_Race_page_10.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book2/Big_Race_page_12.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book2/Big_Race_page_14.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book2/Big_Race_page_16.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book2/Big_race_page_18.jpg',
];

const book3 = [
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/hanumanji.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/hanumanji2.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/monkey.png',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/oroking.png',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/shivji.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/tawk.png',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/ui-screensort.png',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/admin_list.png',
];

const bookNames = [
  'Book 1: Snow Day',
  'Book 2: Husky Storybook',
  'Book 3: Shivji Chronicles'
];


const books = [book1, book2, book3];

export default function Home() {
  return (
    <div className={styles.scope}>
    <main className="app-shell">
      {/* <FlipBook books={books} /> */}
      <FlipBook books={books} bookNames={bookNames} />
    </main>
    </div>
  );
}
