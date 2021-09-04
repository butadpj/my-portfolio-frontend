import style from "./Projects.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import SingleProject from "./SingleProject";

const Projects = ({ projectsData }) => {
  return (
    <section className={style.projects} id="projects">
      <h2 className={style.headerText}>Projects</h2>
      <div className={style.projectsWrapper}>
        <div data-aos="zoom-in">
          <main className={style.main}>
            {projectsData ? (
              <ProjectDisplay data={projectsData} />
            ) : (
              <EmptyProjectMessage />
            )}
          </main>
          <div className={style.jsChallenge}></div>
        </div>
      </div>
    </section>
  );
};

const ProjectDisplay = ({ data }) => {
  let projects = data.map((project) => {
    return (
      <>
        <SingleProject key={project.id} data={project} />
        <hr className={style.endLine} />
      </>
    );
  });

  return (
    <>
      <div className={style.pinnedLineWrapper}>
        <div className={style.pinnedLine}>
          <hr />
          <span>
            <FontAwesomeIcon icon={faThumbtack} className={style.pin} />
          </span>
          <hr className={style.shortLine} />
        </div>
      </div>
      {projects}
    </>
  );
};

const EmptyProjectMessage = () => {
  return (
    <>
      <div className={style.message}>
        <p>Paul haven't added any projects yet</p>
        <p>or</p>
        <p>Something's wrong with the server</p>
      </div>
      <hr className={style.endLine} />
    </>
  );
};

export default Projects;
