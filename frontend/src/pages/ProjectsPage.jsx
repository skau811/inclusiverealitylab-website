import ProjectCard from "../components/ProjectCard";
import ProjectsContainer from "../components/ProjectsContainer";

function ProjectsPage() {
  const projects = [
    { id: 1, title: "Project one sample name", current: true },
    { id: 2, title: "Project two sample name", current: true },
    { id: 3, title: "Project three sample name", current: false },
    { id: 4, title: "Project four sample name", current: false },
    { id: 5, title: "Project one sample name", current: false },
    { id: 6, title: "Project two sample name", current: false },
    { id: 7, title: "Project three sample name", current: false },
    { id: 8, title: "Project four sample name", current: false },
  ];
  return (
    <>
      <div className="w-screen bg-background-white">
        <div className="border-2 border-amber-500 px-1.5 xl:px-0 flex flex-col justify-between items-start  py-5 gap-4 w-full xl:max-w-[1032px]  xl:mx-auto">
          <h1 className="heading1 self-start">Projects</h1>
          <button className="heading4 mt-1">Current Projects</button>
          {/* <div className="grid gap-1.5 w-full grid-cols-[repeat(auto-fit,minmax(256px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
            {projects
              .filter((project) => project.current === true)
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div> */}
          <ProjectsContainer projects={projects.filter((project) => project.current === true)}/>
          <button className="heading4 mt-1">Past Projects</button>
          {/* <div className="grid gap-1.5 w-full grid-cols-[repeat(auto-fit,minmax(256px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
            {projects
              .filter((project) => project.current === false)
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div> */}
          <ProjectsContainer projects={projects.filter((project) => project.current === false)}/>
        </div>
      </div>
    </>
  );
}

export default ProjectsPage;
