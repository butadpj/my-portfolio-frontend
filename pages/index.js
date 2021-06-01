import Head from "next/head";
import Navbar from "../components/Navbar";
import Home from "../components/sections/Home";
import About from "../components/sections/About";
import Aims from "../components/sections/Aims";
import Projects from "../components/sections/Projects";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";
import PWAInstallerAlert from "../components/PWAInstallerAlert";
import UserStatus from "../components/UserStatus";

const index = ({ home, about }) => {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="My personal web dev portfolio" />
        <meta
          name="keywords"
          content="Portfolio, Web development portfolio, I'm Paul, Paul John Butad's Portfolio"
        />
        <title>I'm Paul - Software Developer</title>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <PWAInstallerAlert />
      <Navbar />
      <UserStatus />
      <Home data={home} />
      <About data={about} />
      <Aims />
      <Projects />
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
      revalidate: 30, //seconds
    };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {},
  };
};

export default index;
