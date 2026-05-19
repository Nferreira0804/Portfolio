import { socialMedia } from "../constants";
const Footer = () => {
  return (
    <footer className="relative c-space py-24 flex flex-col items-center overflow-hidden">
      {/* Top Divider Gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />

      <div className="flex flex-col items-center gap-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <a href="#home" className="text-4xl font-outfit font-black tracking-tighter hover:opacity-80 transition-all hover:scale-110">
            N<span className="text-accent-blue">I</span>
          </a>
          <p className="text-neutral-500 font-light max-w-sm">
            Digital engineering for the modern world. Building the future, one line at a time.
          </p>
        </div>

        <div className="flex gap-6">
          {socialMedia.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="group relative flex items-center justify-center w-14 h-14 glass-card rounded-2xl border-white/5 hover:border-accent-blue/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-accent-blue opacity-0 group-hover:opacity-10 transition-opacity" />
              <img
                src={`${import.meta.env.BASE_URL}${social.icon}`}
                alt={social.name}
                className="w-6 h-6 opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 z-10"
              />
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="flex gap-8 text-neutral-600 text-[10px] uppercase tracking-[0.2em] font-bold font-outfit">
            <a href="#about" className="hover:text-accent-blue transition-colors">About</a>
            <a href="#work" className="hover:text-accent-blue transition-colors">Projects</a>
            <a href="#contact" className="hover:text-accent-blue transition-colors">Contact</a>
          </div>
          <p className="text-neutral-600 text-xs font-light mt-4">
            © 2026 Nelson Isaac Ferreira. Crafted with passion.
          </p>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent-blue/5 rounded-full blur-[120px] -z-10" />
    </footer>
  );
};

export default Footer;
