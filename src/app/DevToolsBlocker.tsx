"use client";

import { useEffect } from "react";

export default function DevToolsBlocker() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (
        key === "f12" ||
        (event.ctrlKey && event.shiftKey && ["i", "j", "c", "k"].includes(key)) ||
        (event.metaKey && event.shiftKey && ["i", "j", "c", "k"].includes(key)) ||
        (event.ctrlKey && key === "u") ||
        (event.metaKey && key === "u") ||
        (event.ctrlKey && key === "s") ||
        (event.metaKey && key === "s") ||
        (event.ctrlKey && key === "p") ||
        (event.metaKey && key === "p")
      ) {
        event.preventDefault();
      }
    };

    const preventContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", preventContextMenu);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", preventContextMenu);
    };
  }, []);

  return null;
}
