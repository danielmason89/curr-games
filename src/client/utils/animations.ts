export const fadeIn = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.75,
      },
      exit: {
        opacity: 0,
        transition: { duration: 0.75 },
      },
    },
  };
  
  export const popUp = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.8 },
  };