import InfoLabel from "./labels/InfoLabel";

function ProjectCard({ project, className = "" }) {
  return (
    <div
      className={`${className} group flex flex-col justify-end items-end w-full py-1 px-0.5 gap-1 h-20 bg-[linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.25)),url(/projectPhoto.png)] bg-cover`}
    >
      <h2 className="group-hover:text-yellow-400 heading2 text-baseWhite  hover:text-amber-100 line-clamp-2 ">
        {project?.title ??
          "Enhance human-food interaction in social settings "}
      </h2>
      <div className="self-start flex flex-row flex-wrap gap-0.5 w-full">
        <InfoLabel label="Understand" />
        <InfoLabel label="Augment" />
        <InfoLabel label="Assist" />
      </div>
    </div>
    // <div className="group bg-black p-4">
    //   <h2 className="text-white group-hover:text-yellow-400">Hover me</h2>
    // </div>
  );
}

export default ProjectCard;
