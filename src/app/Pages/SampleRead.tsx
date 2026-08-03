import styles from "./page.module.css";

export default function SamplePage() {
  return (
    <main className={styles.container}>
      <h1>Sample Page</h1>
      <p>
        This is a sample page created with the Next.js App Router.
      </p>

      <section className={styles.card}>
        <h2>Features</h2>
        <ul>
          <li>Responsive Layout</li>
          <li>CSS Modules</li>
          <li>Reusable Components</li>
          <li>SEO Friendly</li>
        </ul>
      </section>

      <button className={styles.button}>
        Get Started
      </button>
    </main>
  );
}