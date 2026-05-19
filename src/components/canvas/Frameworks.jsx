import React from "react";
import { TechRings } from "../ui/tech-rings";

export function Frameworks() {
  const techStack = [
    "css3", "git", "html5", "javascript", "microsoft", "react",
    "vitejs", "tailwindcss", "linux", "threejs",
    "github", "visualstudiocode", "python"
  ];

  // Distribuimos los elementos equitativamente para que no se amontonen
  const innerCircleSkills = techStack.slice(0, 6);
  const outerCircleSkills = techStack.slice(6);

  return (
    /* 1. Aumentamos h a 500px para que el radio de 200px (400px total) respire */
    /* 2. Añadimos bg-background o alguna clase de color si es necesario */
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">

      <span className="pointer-events-none whitespace-pre-wrap gradient-text text-center text-5xl font-outfit font-black leading-none py-4">
        Skills
      </span>

      {/* Círculo Exterior - Radio 190 (Total 380px) */}
      <TechRings
        className="border-none bg-transparent"
        iconSize={40}
        radius={190}
        duration={20} // Usamos duration en lugar de speed si tu librería lo soporta
      >
        {outerCircleSkills.map((skill) => (
          <Icon key={`outer-${skill}`} src={`${import.meta.env.BASE_URL}assets/logos/${skill}.svg`} />
        ))}
      </TechRings>

      {/* Círculo Interior - Radio 100 (Total 200px) */}
      <TechRings
        className="border-none bg-transparent"
        iconSize={30}
        radius={100}
        reverse
        duration={15}
      >
        {innerCircleSkills.map((skill) => (
          <Icon key={`inner-${skill}`} src={`${import.meta.env.BASE_URL}assets/logos/${skill}.svg`} />
        ))}
      </TechRings>
    </div>
  );
}

const Icon = ({ src }) => (
  <img
    src={src}
    alt="tech-icon"
    // Añadimos z-index y filtros para que resalten más
    className="relative z-20 h-full w-full rounded-full border bg-white p-1 shadow-sm transition-all duration-300 hover:scale-150 hover:shadow-md dark:bg-zinc-800"
    onError={(e) => { e.target.style.display = 'none'; }}
  />
);
