import { useState } from "react";
import styles from "./Ribbon.module.css";

interface RibbonProps {
  text?: string;
  className?: string;
}

export default function Ribbon({
  text = "CSS Animated Ribbon",
  className = "",
}: RibbonProps) {
  const [animationKey, setAnimationKey] = useState(0);

  const replayAnimation = () => {
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div
      key={animationKey}
      className={`${styles.ribbon} ${
        className ? styles[className as keyof typeof styles] : ""
      }`}
      onClick={replayAnimation}
    >
      {text}
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}
