import { useScroll, useTransform } from "framer-motion";

interface ParallaxOptions {
  yInput?: number;
  yOutput?: number;
  opacityInput?: number;
  opacityMin?: number;
}

export function useParallax(options: ParallaxOptions = {}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, options.yInput ?? 500], [0, options.yOutput ?? 150]);
  const opacity = useTransform(scrollY, [0, options.opacityInput ?? 300], [1, options.opacityMin ?? 0]);
  return { y, opacity, scrollY };
}
