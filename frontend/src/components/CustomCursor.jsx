// src/components/CustomCursor.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none select-none text-3xl"
      style={{ x: pos.x, y: pos.y, transform: "translate(-50%, -50%)", zIndex: 999999  }}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 1 }}
    >
 🍹
    </motion.div>
  );
}
