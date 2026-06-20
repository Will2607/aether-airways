"use client";

import { useState, useEffect, useRef } from "react";

interface ScrollState {
  y: number;
  scrolled: boolean;
  direction: "up" | "down";
}

/**
 * Tracks scroll position, whether the page is scrolled past a threshold,
 * and the current scroll direction (for hide-on-scroll-down navbars).
 */
export function useScroll(threshold = 80): ScrollState {
  const [state, setState] = useState<ScrollState>({
    y: 0,
    scrolled: false,
    direction: "up",
  });
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setState({
        y,
        scrolled: y > threshold,
        direction: y > lastY.current ? "down" : "up",
      });
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return state;
}
