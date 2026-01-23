import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import ToastNotification from "../components/ui/toast-notification";
import { BackgroundParticles } from "../components/ui/background-particles";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  // Inicialización recomendada para asegurar la conexión con la API
  useEffect(() => {
    emailjs.init("N5evd8pPUjRZDsdAx");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Enviando datos:", formData);

      // Los nombres de las llaves (name, email, message, title) 
      // DEBEN ser iguales a los de tu plantilla en EmailJS
      await emailjs.send(
        "service_5fij59e",
        "template_xxpjrs6",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          title: "Contacto desde el Portafolio", // Variable {{title}} de tu plantilla
        }
      );

      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "Your message has been sent!");
    } catch (error) {
      setIsLoading(false);
      console.error("Error detallado:", error);
      showAlertMessage("danger", "Something went wrong! Check console.");
    }
  };

  return (
    <section id="contact" className="relative flex flex-col items-center justify-center py-32 c-space min-h-screen overflow-hidden">
      <BackgroundParticles
        className="absolute inset-0 -z-10"
        quantity={150}
        ease={80}
        color={"#ffffff"}
        refresh
      />

      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[140px] -z-10" />

      {showAlert && <ToastNotification type={alertType} text={alertMessage} />}

      <div className="flex flex-col items-center mb-16 text-center z-10">
        <h2 className="text-4xl md:text-6xl font-outfit font-black mb-4">Let's Create Together</h2>
        <p className="text-neutral-400 font-light text-lg max-w-xl">
          Whether you have a specific project in mind or just want to explore possibilities,
          I'm always open to new challenges.
        </p>
      </div>

      <div className="w-full max-w-2xl glass-card p-10 md:p-14 shadow-2xl relative z-10 border-white/10">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <label htmlFor="name" className="text-sm font-medium text-neutral-300 font-outfit uppercase tracking-widest pl-2">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full glass-pill bg-white/[0.03] py-4 px-8 border border-white/5 focus:border-accent-blue/50 outline-none transition-all duration-300 text-white placeholder-neutral-600"
              placeholder="ex., Nelson Ferreira"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="email" className="text-sm font-medium text-neutral-300 font-outfit uppercase tracking-widest pl-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full glass-pill bg-white/[0.03] py-4 px-8 border border-white/5 focus:border-accent-blue/50 outline-none transition-all duration-300 text-white placeholder-neutral-600"
              placeholder="ex., nferreira@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="message" className="text-sm font-medium text-neutral-300 font-outfit uppercase tracking-widest pl-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full glass-card bg-white/[0.03] rounded-3xl py-5 px-8 border border-white/5 focus:border-accent-blue/50 outline-none transition-all duration-300 text-white placeholder-neutral-600 resize-none"
              placeholder="What's on your mind?"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-5 rounded-2xl bg-accent-blue hover:bg-white hover:text-black text-white font-bold uppercase tracking-widest transition-all duration-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-white/20 active:scale-95 disabled:opacity-50"
          >
            {isLoading ? "Sending Message..." : "Launch Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;