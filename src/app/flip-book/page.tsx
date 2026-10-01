import FlipBook from '../Components/FlipBook';
import styles from "./flip-book.module.css";


const book1 = [
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/snow_day_page_6_resize.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/Snow_Day_page_8.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/Snow_Day_page_10.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/snow_day_page_12_resize.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/Snow_Day_page_16.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/Snow_Day_page _17.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/snow_day_page_19_resize.jpg',
  'https://dreamlogodesign.net/dev/animationsite/animationHtml/Huskeroonies/Books/Book11/snow_day_page_27_resize.jpg',
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
  'Book 1: Snow Day',
  'Book 2: Big Race',
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
      <FlipBook books={books} bookNames={bookNames} initialBook={initialBook} />
    </main>
    </div>
  );
}
