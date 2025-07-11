import ProjectCard from "../components/ProjectCard";
import projects from "../sampleData/projects";
import ProjectsContainer from "../components/ProjectsContainer";
import PublicationSectionWrapper from "../components/wrappers/PublicationSectionWrapper";

function ProjectsPage() {
  return (
    <>
      <div className="mt-4 w-screen bg-background-white">
        <div className=" px-1.5 xl:px-0 flex flex-col justify-between items-start  py-5 gap-4 w-full xl:max-w-[1032px]  xl:mx-auto">
          <h1 className="heading1 self-start">Projects</h1>

          <button className="heading4 mt-1">Current Projects</button>
          <ProjectsContainer
            projects={projects.filter((project) => project.current === true)}
          />
          <button className="heading4 mt-1">Past Projects</button>
          <ProjectsContainer
            projects={projects.filter((project) => project.current === false)}
          />
        </div>
      </div>
    </>
  );
}

export default ProjectsPage;
