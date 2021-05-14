import Image from "next/image";
import style from "./About.module.css";

const About = () => {
  return (
    <section className={style.about} id="about">
      <main className={style.main}>
        <header className={style.header}>ABOUT ME</header>
        <div className={style.aboutText}>
          I've spent the past 1+ year solving business problems with my passion
          in software development. <br /> <br /> These days, my time is spent on
          improving our full-stack ecommerce app that I've been working on since
          last year
        </div>
        <div className={style.profile}>
          <Image
            src="/picture/resume_pic_1_50.png"
            width={100}
            height={100}
            className={style.profileImg}
          />
          <div className={style.profileName}>Paul John Butad</div>
        </div>
      </main>
    </section>
  );
};

export default About;
