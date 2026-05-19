import { motion } from "motion/react";

const HeroText = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="z-20 relative flex flex-col items-center md:items-start text-center md:text-left mt-24 md:mt-0 md:max-w-[60%]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >

      <motion.p
        variants={itemVariants}
        className="text-neutral-400 font-medium tracking-widest uppercase text-[10px] md:text-sm mb-4"
      >
        Nelson Isaac Ferreira
      </motion.p>

      <motion.h1
        variants={itemVariants}
        className="text-5xl sm:text-6xl md:text-[7rem] font-outfit font-black tracking-tighter leading-[0.9] md:leading-[0.85] mb-8"
      >
        Systems <br />
        <span className="gradient-text italic font-black">
          Developer
        </span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="max-w-lg text-neutral-400 text-base md:text-xl font-light mb-12 leading-relaxed"
      >
        Specializing in building <span className="text-white font-medium">high-performance</span> digital systems.
        I create experiences where code meets vision.
      </motion.p>

      <motion.div variants={itemVariants} className="flex flex-wrap gap-6 items-center justify-center md:justify-start">
        <a
          href={`${import.meta.env.BASE_URL}curriculum.pdf`}
          download="CV_Nferreira.pdf"
          className="group relative px-10 py-5 bg-white text-black font-black rounded-full transition-all duration-500 hover:bg-accent-blue hover:text-white shadow-[0_0_30px_rgba(255,255,100,0.1)] hover:shadow-accent-blue/40 overflow-hidden"
        >
          <span className="relative z-10 uppercase tracking-widest text-xs">Download CV</span>
        </a>
        <a
          href="#work"
          className="px-10 py-5 glass-pill border-white/10 hover:border-white/30 text-white font-bold transition-all duration-500 active:scale-95 group flex items-center gap-3"
        >
          <span className="uppercase tracking-widest text-xs">View Projects</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:translate-x-1 transition-transform">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </motion.div>
    </motion.div>
  );
};

export default HeroText;