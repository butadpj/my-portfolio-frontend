import Head from "next/head";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import About from "../components/About";
import Aims from "../components/Aims";
import Project from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const index = ({ home, about }) => {
  return (
    <>
      <Head>
        <title>I'm Paul - Software Developer</title>
      </Head>
      <Navbar />
      <Home data={home} />
      <About data={about} />
      <Aims />
      <Project />
      <Contact />
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  let fetchUrl = `${process.env.devHost}/api/`;
  let fetchApiVersion = "v1/";
  let fetchSectionUrls = ["home/", "about/"];
  try {
    // Single URL fetch
    // const res = await fetch(`http://127.0.0.1:8000/api/v1/home/`);
    // const home = await res.json();

    // Multiple URL fetch
    const responses = await Promise.all(
      fetchSectionUrls.map((sections) =>
        fetch(`${fetchUrl}${fetchApiVersion}${sections}`).then((res) =>
          res.json()
        )
      )
    );

    if (!responses) {
      return {
        notFound: true,
      };
    }

    return {
      props: { home: responses[0], about: responses[1] },
    };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {},
  };
};

export default index;
