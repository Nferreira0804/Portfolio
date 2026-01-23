import { MilestoneTracker } from "../components/ui/milestone-tracker";
import { experiences } from "../constants";
const Experiences = () => {
  return (
    <section className="c-space py-32" id="work-history">
      <div className="flex flex-col items-center mb-20 text-center">
        <p className="text-accent-blue font-medium tracking-widest uppercase text-sm mb-4">Experience</p>
        <h2 className="text-4xl md:text-6xl font-outfit font-black mb-6">Work History</h2>
        <div className="w-20 h-1.5 bg-accent-blue rounded-full mx-auto" />
      </div>

      <div className="w-full">
        <MilestoneTracker data={experiences} />
      </div>
    </section>
  );
};

export default Experiences;
