import styles from "../page.module.css";
import Header from "../Components/header";

export default function SamplePage() {
  return (
    <>
    <Header/>
    <main>
      <section className={styles.sampleReadBannerWrap}>
        <div className={styles.sampleReadBanner}> </div>
      </section>
    </main>
    </>
  );
}