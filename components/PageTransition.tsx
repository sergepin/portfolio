"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

type PageTransitionProps = {
  children: ReactNode;
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  return (
  <AnimatePresence>
    <div key={pathname}>
      <motion.div initial={{opacity:1}} animate={{opacity:0, transition:{delay:0.6, duration:0.7, ease:"easeInOut"}}} className="h-screen w-screen fixed bg-primary top-0 pointer-events-none"/>
      {children}
    </div>
  </AnimatePresence>);
};

export default PageTransition;
