import { useMemo } from "react";
import styles from "./SnowFall.module.css";

interface SnowFallProps {
  count?: number;
  className?: string;
}

type SnowflakeStyle = React.CSSProperties & {
  "--snow-left": string;
  "--snow-drift": string;
  "--snow-drift-half": string;
  "--snow-duration": string;
  "--snow-delay": string;
  "--snow-opacity": string;
};

export default function SnowFall({
  count = 120,
  className = "",
}: SnowFallProps) {
  const snowflakes = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const drift = 8 + ((index * 13) % 4);

        return {
          id: index,
          size:
            index >= count * 0.85
              ? styles.snowflakeLarge
              : index >= count * 0.7
                ? styles.snowflakeMedium
                : "",
          style: {
            "--snow-left": `${(index * 47) % 100}%`,
            "--snow-drift": `${drift}vw`,
            // Precalculate this value instead of using CSS calc multiplication.
            "--snow-drift-half": `${drift / 2}vw`,
            "--snow-duration": `${10 + ((index * 17) % 12)}s`,
            "--snow-delay": `-${(index * 29) % 19}s`,
            "--snow-opacity": `${0.45 + ((index * 11) % 50) / 100}`,
          } as SnowflakeStyle,
        };
      }),
    [count]
  );

  return (
    <div
      className={`${styles.SnowFall} ${className}`}
      aria-hidden="true"
    >
      {snowflakes.map((snowflake) => (
        <span
          key={snowflake.id}
          className={`${styles.snowflake} ${snowflake.size}`}
          style={snowflake.style}
        >
          {"❄︎"}
        </span>
      ))}
    </div>
  );
}
