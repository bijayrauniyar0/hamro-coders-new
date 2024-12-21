export const movingUpwardVariant = {
  enter: { opacity: 0, y: 100 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
};
export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each card
    },
  },
};

export const cardVariants = {
  hidden: { y: '100%', x: -50, opacity: 0 }, // Start slightly below with no opacity
  show: { y: 0, x: 0, opacity: 1, transition: { duration: 0.3 } }, // Move up and fade in
};
