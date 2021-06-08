import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCodeBranch, faEye } from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";
import style from "./SingleProject.module.css";

import EyeFollowing from "../../../EyeFollowing";
import useDateFormat from "../../../../hooks/useDateFormat";

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

const SingleProject = ({ data }) => {
  console.log(data);
  const {
    title,
    started_at,
    currently_working_on,
    finished_at,
    description,
    website_link,
    github_link,
    preview_image,
    tech_stacks,
  } = data;

  return (
    <article className={style.projectWrapper}>
      <h3 className={style.title}>{title}</h3>
      <p className={style.date}>
        {useDateFormat(started_at)} -{" "}
        {currently_working_on ? "PRESENT" : useDateFormat(finished_at)}
      </p>
      <div className={style.description}>
        <p>{description}</p>
      </div>
      <div className={style.links}>
        <div className={style.websiteLink}>
          <FontAwesomeIcon icon={faLink} />
          <a href={`https://${website_link}`} target="_blank">
            Live Demo
          </a>
        </div>
        <div className={style.repoLink}>
          <FontAwesomeIcon icon={faCodeBranch} />
          <a href={`https://${github_link}`} target="_blank">
            Github Repo
          </a>
        </div>
      </div>
      <div data-aos="fade-up">
        <Image
          src={preview_image}
          width={800}
          height={484}
          layout="responsive"
          alt="project-preview-image"
          className={style.previewImg}
        />
      </div>

      <div className={style.techStack}>
        <h2>Tech stack:</h2>
        <div className={style.tsImages}>
          {tech_stacks.map((ts) => {
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
