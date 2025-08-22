
import { useEffect, useRef } from "react";

const EMOJIS = ["🍕","🍩","🍓","🍪","🍔","🍰","🍇","🍉","🌮","🍣","🍦","🥐","🍬"];

export default function EmojiTrail({
  density = 1,     // how many per mousemove
  size = 22,       // font size in px
  max = 120,       // max total emojis on screen
  z = 999999       // z-index so it stays on top
}) {
  const nodes = useRef([]);
  const idx = useRef(0);

  useEffect(() => {
    const onMove = (e) => {
      for (let i = 0; i < density; i++) {
        const el = document.createElement("span");
        el.className = "emoji-trail";
        el.textContent = EMOJIS[idx.current++ % EMOJIS.length];

        // slight random jitter so they don't stack perfectly
        const jitterX = (Math.random() * 12) - 6;
        const jitterY = (Math.random() * 12) - 6;

        el.style.left = `${e.clientX + jitterX}px`;
        el.style.top  = `${e.clientY + jitterY}px`;
        el.style.fontSize = `${size}px`;
        el.style.zIndex = z;

        document.body.appendChild(el);
        nodes.current.push(el);

        el.addEventListener("animationend", () => {
          el.remove();
        });
      }

      // keep things performant
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

  return null; // nothing to render—elements are added to <body>
}
