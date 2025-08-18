
import { useEffect, useRef } from "react";

const EMOJIS = ["🍕","🍩","🍓","🍪","🍔","🍰","🍇","🍉","🌮","🍣","🍦","🥐","🍬"];

export default function EmojiTrail({
  density = 1,     // slightly more for a richer trail
  size = 24,       // bigger + glowing
  max = 150,       // allow more before cleanup
  z = 999999
}) {
  const nodes = useRef([]);
  const idx = useRef(0);

  useEffect(() => {
    const onMove = (e) => {
      for (let i = 0; i < density; i++) {
        const el = document.createElement("span");
        el.className = "emoji-trail";
        el.textContent = EMOJIS[idx.current++ % EMOJIS.length];

        // jitter so they don't align too perfectly
        const jitterX = (Math.random() * 20) - 10;
        const jitterY = (Math.random() * 20) - 10;

        el.style.left = `${e.clientX + jitterX}px`;
        el.style.top  = `${e.clientY + jitterY}px`;
        el.style.fontSize = `${size + Math.random() * 10}px`;
        el.style.zIndex = z;

        // random animation duration for variety
        el.style.animationDuration = `${800 + Math.random() * 600}ms`;

        document.body.appendChild(el);
        nodes.current.push(el);

        el.addEventListener("animationend", () => {
          el.remove();
        });
      }

      // clean old ones
      if (nodes.current.length > max) {
        const excess = nodes.current.splice(0, nodes.current.length - max);
        excess.forEach(n => n.remove());
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      nodes.current.forEach(n => n.remove());
      nodes.current = [];
    };
  }, [density, size, max, z]);

  return null;
}
