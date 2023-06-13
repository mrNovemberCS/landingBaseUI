import { useState, useEffect } from "react";

export default function useNearBottomScroll(threshold = 0.9): boolean {
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      const isNearBottom = scrollPosition > pageHeight * threshold;
      setIsNearBottom(isNearBottom);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isNearBottom;
}
