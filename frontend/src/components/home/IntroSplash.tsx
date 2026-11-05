"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** A short brand "ident" that plays once per browser session. */
export function IntroSplash({ brandName }: { brandName: string }) {
  const reduce = useReducedMotion();
  // Rendered on the server so first-time visitors never see the page flash before the ident.
  const [show, setShow] = useState(true);

  useEffect(() => {
    const seen = reduce || sessionStorage.getItem("abhijayflix:intro");
    if (!seen) sessionStorage.setItem("abhijayflix:intro", "1");
    const t = setTimeout(() => setShow(false), seen ? 0 : 2300);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setShow(false)}
          aria-hidden
        >
          <motion.span
            className="font-display text-6xl tracking-wider text-flix-red sm:text-8xl md:text-9xl"
            style={{ textShadow: "0 0 40px rgb(229 9 20 / 0.55)" }}
            initial={{ scale: 0.6, opacity: 0, letterSpacing: "0.5em" }}
            animate={{ scale: [0.6, 1, 1.15], opacity: [0, 1, 1], letterSpacing: ["0.5em", "0.05em", "0.05em"] }}
            transition={{ duration: 2, times: [0, 0.45, 1], ease: "easeOut" }}
          >
            {brandName}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
