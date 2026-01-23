import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

function Navigation({ orientation = "horizontal" }) {
  return (
    <ul className={`flex ${orientation === "vertical" ? "flex-col gap-6" : "gap-8"}`}>
      {NAV_LINKS.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className="text-sm font-medium text-neutral-400 hover:text-white transition-all duration-300 relative group"
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-blue transition-all duration-300 group-hover:w-full" />
          </a>
        </li>
      ))}
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center px-4">
      <nav className="glass-pill px-6 py-3 flex items-center justify-between w-full max-w-4xl shadow-2xl">
        <a href="#home" className="text-xl font-bold font-outfit tracking-tighter hover:opacity-80 transition-opacity">
          N<span className="text-accent-blue">I</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden sm:block">
          <Navigation />
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex sm:hidden p-2 text-neutral-400 hover:text-white focus:outline-none"
        >
          <img
            src={isOpen ? `${import.meta.env.BASE_URL}assets/close.svg` : `${import.meta.env.BASE_URL}assets/menu.svg`}
            className="w-6 h-6"
            alt="toggle"
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-20 inset-x-4 glass-card p-8 flex flex-col items-center sm:hidden z-40"
          >
            <Navigation orientation="vertical" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
