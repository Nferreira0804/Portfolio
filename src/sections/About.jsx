import { useRef, Suspense, lazy } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Center } from '@react-three/drei';
import { useMediaQuery } from "react-responsive";
import CanvasLoader from "../components/ui/canvas-loader";
import { Cup } from "../components/canvas/Cup";

const Frameworks = lazy(() => import("../components/canvas/Frameworks").then(module => ({ default: module.Frameworks })));

const About = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <section className="c-space section-spacing py-24" id="about">
      <div className="flex flex-col items-center md:items-start mb-16">
        <h2 className="text-4xl md:text-6xl font-outfit font-black mb-4">About Me</h2>
        <div className="w-20 h-1.5 bg-accent-blue rounded-full" />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-6">
        {/* Methodologies Card */}
        <div className="relative col-span-1 md:col-span-3 glass-card flex flex-col justify-end min-h-[350px] md:min-h-[400px] group overflow-hidden">
          <img
            src="assets/programming.webp"
            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700"
            alt="background"
          />

          <div className="absolute inset-0 z-10 w-full h-full p-8 flex flex-wrap gap-4 items-start content-start">
            <span className="glass-pill px-6 py-2 text-white/80 font-outfit font-bold border-white/10 shadow-xl">GRASP</span>
            <span className="glass-pill px-6 py-2 text-white/80 font-outfit font-bold border-white/10 shadow-xl">SOLID</span>
            <span className="glass-pill px-6 py-2 text-white/80 font-outfit font-bold border-white/10 shadow-xl">DRY</span>
          </div>

          <div className="relative z-20 p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-xl md:text-2xl font-outfit font-bold text-white mb-2">Methodologies</p>
            <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">Focus on clean, scalable and maintainable code through industry standards.</p>
          </div>
        </div>

        {/* 3D Mug Card */}
        <div className="col-span-1 md:col-span-3 glass-card relative overflow-hidden flex flex-col min-h-[400px]">
          <div className="relative z-20 p-6 md:p-8">
            <p className="text-xl md:text-2xl font-outfit font-bold text-white mb-2">Hi, I'm Nelson</p>
            <p className="text-neutral-400 text-sm md:text-base font-light">Passionate full-stack developer based in Venezuela, dedicated to building digital excellence.</p>
          </div>

          <div className="absolute inset-0 z-10 w-full h-full pt-16">
            <Canvas shadows camera={{ position: [0, 0, 5], fov: 35 }}>
              <Suspense fallback={<CanvasLoader />}>
                <Stage environment="city" intensity={0.6} contactShadow={true}>
                  <Center>
                    <Cup scale={isMobile ? 1.2 : 1.5} />
                  </Center>
                </Stage>
                <OrbitControls enableZoom={false} autoRotate />
              </Suspense>
            </Canvas>
          </div>
        </div>

        {/* Tech Stack Card */}
        <div className="col-span-1 md:col-span-6 glass-card relative overflow-hidden flex flex-col md:flex-row items-center min-h-[400px] p-8 md:p-0">
          <div className="z-10 p-6 md:p-8 w-full md:w-1/2">
            <h3 className="text-2xl md:text-3xl font-outfit font-black mb-4">Tech Stack</h3>
            <p className="text-neutral-400 font-light text-base md:text-lg">
              I leverage modern technologies to build high-performance web applications. My toolkit includes React, Three.js, and specialized backend solutions.
            </p>
          </div>

          <div className="relative w-full md:w-1/2 h-[300px] md:h-full">
            <Frameworks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;