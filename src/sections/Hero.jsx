import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/shared/HeroText";
import AtmosphericCanvas from "../components/canvas/atmospheric-canvas";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense, lazy } from "react";
import CanvasLoader from "../components/ui/canvas-loader";

const Fox = lazy(() => import("../components/canvas/Fox_in_a_cape").then(module => ({ default: module.Fox })));

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  return (
    <section id="home" className="min-h-screen relative flex flex-col md:flex-row items-center justify-center md:justify-between c-space py-20 overflow-hidden">
      <HeroText />

      <AtmosphericCanvas />

      {/* Decorative background blurs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[140px]" />
      </div>

      <figure
        className="relative z-10 w-full md:w-1/2 h-[50vh] md:h-screen flex items-center justify-center mt-10 md:mt-0"
      >
        <div className="absolute inset-0 bg-radial from-accent-blue/5 to-transparent blur-3xl opacity-50" />

        <Canvas camera={{ position: [0, 1, 4], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <spotLight position={[10, 15, 10]} angle={0.25} penumbra={1} intensity={3} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#7c3aed" />
          <Environment preset="city" />

          <Suspense fallback={<CanvasLoader />}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <Fox
                scale={isMobile ? 0.35 : 0.6}
                position={isMobile ? [0, 0.6, 0] : [0, -1.5, 0]}
              />
            </Float>

            <ContactShadows position={[0, -1.8, 0]} opacity={0.5} scale={8} blur={3} far={2} />
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 4],
      0.5,
      delta
    );
  });
}

export default Hero;