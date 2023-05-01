import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants/constants";

const icons = Object.values(technologies).map((technology) => technology.icon);
const names = Object.values(technologies).map((technology) => technology.name);
const Tech = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      
        <div className="w-full h-[75vh] mx-auto" key={names}>
          <BallCanvas icons={icons} />
        </div>
      
    </div>
  )
}

export default SectionWrapper(Tech, "")