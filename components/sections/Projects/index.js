import style from "./Projects.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import SingleProject from "./SingleProject";

const Projects = () => {
  return (
    <section className={style.projects} id="projects">
      <h2 className={style.headerText}>Projects</h2>
      <div className={style.projectsWrapper}>
        <main className={style.main}>
          <div className={style.pinnedLineWrapper}>
            <div className={style.pinnedLine}>
              <hr />
              <span>
                <FontAwesomeIcon icon={faThumbtack} className={style.pin} />
              </span>
              <hr className={style.shortLine} />
            </div>
          </div>
          <SingleProject />
          <hr className={style.endLine} />
        </main>
        <div className={style.jsChallenge}></div>
      </div>
    </section>
  );
};

export default Projects;
