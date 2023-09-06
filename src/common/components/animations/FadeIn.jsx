import React from "react";

import { motion } from "framer-motion";

const FadeIn = ({
  children,
  duration = 0.4,
  delay = 0,
  distance = 100,
  direction = "up",
  withOpacity = true,
  ...props
}) => {
  return (
    <motion.div
      {...props}
      initial={{
        opacity: withOpacity ? 0 : 1,
        y: direction === "down" ? -distance : direction === "up" ? distance : 0,
        x:
          direction === "left"
            ? distance
            : direction === "right"
            ? -distance
            : 0,
      }}
      animate={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      transition={{
        duration,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
