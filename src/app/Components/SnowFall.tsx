import { useMemo } from "react";
import styles from "./SnowFall.module.css";

interface SnowFallProps {
  count?: number;
  className?: string;
}

export default function SnowFall({
  count = 200,
  className = "",
}: SnowFallProps) {
  const snowflakes = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const isMedium = index >= count * 0.7 && index < count * 0.85;
        const isLarge = index >= count * 0.85;

        return {
          id: index,
          size: isLarge
            ? styles.snowflakeLarge
            : isMedium
              ? styles.snowflakeMedium
              : "",
          style: {
            "--snow-left": `${(index * 47) % 100}%`,
            "--snow-drift": `${8 + ((index * 13) % 4)}vw`,
            "--snow-duration": `${10 + ((index * 17) % 12)}s`,
            "--snow-delay": `-${(index * 29) % 19}s`,
            "--snow-opacity": `${0.45 + ((index * 11) % 50) / 100}`,
            "--snow-blur": `${index % 3 === 0 ? 0.5 : 0}px`,
          } as React.CSSProperties,
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
