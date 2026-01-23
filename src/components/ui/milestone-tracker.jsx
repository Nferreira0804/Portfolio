"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const MilestoneTracker = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-20 md:pt-40 md:gap-10"
          >
            {/* Left Side: Sticky Date Badge */}
            <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
              <div className="absolute flex items-center justify-center -left-[2.5px] md:left-[3px]">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-card border-white/10 flex items-center justify-center p-2 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                  <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-accent-blue animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                </div>
              </div>

              <div className="hidden md:flex flex-col pl-24">
                <div className="glass-pill px-4 py-1 w-fit mb-4 border-white/5 bg-accent-blue/5">
                  <span className="text-accent-blue font-mono text-xs font-bold tracking-widest">{item.date}</span>
                </div>
                <h3 className="text-4xl font-outfit font-black text-white leading-tight">{item.title}</h3>
                <h4 className="text-xl font-medium text-neutral-500 mt-2">{item.job}</h4>
              </div>
            </div>

            {/* Right Side: Elegant Content Cards */}
            <div className="relative w-full pl-12 pr-4 md:pl-0">
              <div className="block mb-8 md:hidden">
                <div className="glass-pill px-3 py-1 w-fit mb-3 border-white/5 bg-accent-blue/5">
                  <span className="text-accent-blue font-mono text-[10px] font-bold tracking-widest">{item.date}</span>
                </div>
                <h3 className="text-2xl font-outfit font-black text-white leading-tight">{item.title}</h3>
                <h4 className="text-base font-medium text-neutral-500 mt-1">{item.job}</h4>
              </div>

              <div className="p-6 md:p-12 glass-card hover:border-accent-blue/30 transition-all duration-700 group shadow-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 rounded-full blur-3xl -z-10 group-hover:bg-accent-blue/10 transition-colors" />

                <ul className="space-y-4 md:space-y-6">
                  {item.descriptions.map((content, idx) => (
                    <li key={idx} className="flex gap-4 md:gap-6 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                      <p className="text-neutral-400 font-light leading-relaxed text-sm md:text-xl group-hover:text-neutral-300 transition-colors">
                        {content}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {/* Central Premium Timeline Line */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-2 top-0 overflow-hidden w-[3px] bg-white/[0.03] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-full bg-gradient-to-b from-accent-blue via-accent-purple to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />
        </div>
      </div>
    </div>
  );
};
