import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCodeBranch, faEye } from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";
import style from "./SingleProject.module.css";

import EyeFollowing from "../../../EyeFollowing";

const DATE = "October 26, 2020";
const techStack = [
  {
    id: 1,
    stack_name: "django",
  },
  {
    id: 2,
    stack_name: "react",
  },
  {
    id: 3,
    stack_name: "javascript",
  },
  {
    id: 4,
    stack_name: "mysql",
  },
];

const SingleProject = () => {
  return (
    <article className={style.projectWrapper}>
      <h3 className={style.title}>Nenetelecom</h3>
      <p className={style.date}>{DATE} - PRESENT</p>
      <div className={style.description}>
        <p>
          Full-stack installable ecommerce app for our own mobile phone retail
          store.
        </p>
      </div>
      <div className={style.links}>
        <div className={style.websiteLink}>
          <FontAwesomeIcon icon={faLink} />
          <a href="https://www.nenetelecom.app" target="_blank">
            Live Demo
          </a>
        </div>
        <div className={style.repoLink}>
          <FontAwesomeIcon icon={faCodeBranch} />
          <a
            href="https://github.com/butadpj/nenetelecom-final"
            target="_blank"
          >
            Github Repo
          </a>
        </div>
      </div>
      <Image
        src="/images/project-preview/nenetelecom-preview.png"
        width={800}
        height={484}
        layout="responsive"
        alt="project-preview-image"
        className={style.previewImg}
      />
      <div className={style.techStack}>
        <h2>Tech stack:</h2>
        <div className={style.tsImages}>
          {techStack.map((ts) => {
            return (
              <div key={ts.id}>
                <img
                  src={`/images/tech-stack-images/ts-icon-${ts.stack_name}@2x.png`}
                  alt={`${ts.stack_name}-tech-stack-image`}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Button
        size="large"
        variant="contained"
        className={`btn icon btn-dark ${style.detailBtn}`}
      >
        <p>Details</p>
        <EyeFollowing />
        {/* <FontAwesomeIcon icon={faEye} /> */}
      </Button>
    </article>
  );
};

export default SingleProject;
