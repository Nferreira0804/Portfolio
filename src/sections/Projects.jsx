import { projects } from "../constants";

const Projects = () => {
  const displayedProjects = projects.slice(0, 5);

  return (
    <section id="work" className="c-space py-24 md:py-32">
      <div className="flex flex-col items-center mb-16 md:mb-20 text-center px-4">
        <p className="text-accent-blue font-medium tracking-widest uppercase text-[10px] md:text-sm mb-4">My Portfolio</p>
        <h2 className="text-3xl md:text-6xl font-outfit font-black mb-6">Selected Projects</h2>
        <p className="max-w-2xl text-neutral-400 font-light text-base md:text-lg">
          A collection of digital experiences where engineering meets aesthetics.
          Each project represents a unique challenge and a modern solution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="group glass-card overflow-hidden flex flex-col transition-all duration-500 hover:border-accent-blue/50"
          >
            <div className="relative h-64 w-full overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}${project.image}`}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </div>

            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-3xl font-outfit font-bold text-white group-hover:text-accent-blue transition-colors">
                  {project.title}
                </h3>
                <div className="p-2 rounded-full glass-pill border-white/10 group-hover:bg-accent-blue group-hover:text-white transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 transition-transform duration-300 group-hover:translate-x-1">
                {project.tags?.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 text-xs font-medium glass-pill text-neutral-300 border-white/5"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;