import Image from "next/image";
import style from "./About.module.css";
import useGetVersion from "../../hooks/useGetVersion";

const About = ({ data }) => {
  let aboutData = useGetVersion("v1", data);
  console.log(aboutData);

  // SET DEFAULT DATA (FALL BACK) when server is down

  let aboutText = aboutData
    ? aboutData.about_text
    : "I've spent the past 1+ year solving business problems with my passion in software development.\n \nThese days, my time is spent on improving our full-stack ecommerce app that I've been working on since last year.";
  let displayPicture = aboutData
    ? aboutData.display_picture
    : "/images/picture/resume_pic_1_50.png";

  let personName = aboutData ? aboutData.person_name : "Paul John Butad";

  console.log(displayPicture);

  return (
    <section className={style.about} id="about">
      <header className={style.header}>ABOUT ME</header>
      <main className={style.main}>
        <div className={style.aboutText}>{aboutText}</div>
        <div className={style.profile}>
          <Image
            src={displayPicture}
            width={100}
            height={100}
            className={style.profileImg}
          />
          <div className={style.profileName}>{personName}</div>
        </div>
      </main>
    </section>
  );
};

export default About;
