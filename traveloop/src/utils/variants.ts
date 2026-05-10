import type { Variants } from 'framer-motion'

/** Stagger fade-up variant. Use with `custom={index}` on motion elements. */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  }),
}

/** Stagger fade-left variant. Use with `custom={index}` on motion elements. */
export const fadeLeftVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.35,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  }),
}

/** Stagger fade-right variant. Use with `custom={index}` on motion elements. */
export const fadeRightVariants: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.35,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  }),
}

/** Simple fade-in (no stagger). */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
}
