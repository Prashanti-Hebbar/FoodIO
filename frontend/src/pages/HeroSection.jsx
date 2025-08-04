import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 300], ["0%", "20%"]); // Parallax effect

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg.png')",
          y: yBg,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Foreground Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-20 relative w-full h-full flex flex-col justify-center items-center px-4 text-white text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <TypeAnimation
            sequence={["Savor Every Bite", 2000, "Discover New Flavors", 2000, "Travel Through Taste", 2000]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-yellow-400"
          />
        </h1>
        <p className="text-lg md:text-xl max-w-xl">
          Discover recipes, spices & food stories from around the world.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a
            href="#explore"
            className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl shadow hover:bg-yellow-500 transition"
          >
            Start Exploring
          </a>
          <a
            href="#recipes"
            className="border border-yellow-400 text-yellow-400 px-6 py-3 rounded-xl hover:bg-yellow-500 hover:text-black transition"
          >
            Browse Recipes
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
