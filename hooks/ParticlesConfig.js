import { useState, useEffect } from "react";
import useGetRandomItem from "./useGetRandomItem";

const ParticlesConfig = () => {
  const [chosenParam, setChosenParam] = useState(
    useGetRandomItem([
      //Simple
      {
        particles: {
          number: {
            value: 50,
          },
          size: {
            value: 3,
          },
          line_linked: {
            color: "rgb(204, 212, 124)",
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: "repulse",
            },
          },
        },
      },
      //Bubbles
      {
        particles: {
          number: {
            value: 20,
            density: {
              enable: false,
            },
          },
          size: {
            value: 50,
            random: true,
            anim: {
              speed: 2,
              size_min: 0.3,
            },
            color: "rgb(204, 212, 124)",
          },
          line_linked: {
            enable: false,
          },
          move: {
            random: true,
            speed: 0.5,
            direction: "top",
            out_mode: "out",
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: "bubble",
            },
            onclick: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            bubble: {
              distance: 250,
              duration: 2,
              size: 0,
              opacity: 0,
            },
            repulse: {
              distance: 600,
              duration: 4,
            },
          },
        },
      },
      //Night Sky
      {
        particles: {
          number: {
            value: 50,
            density: {
              enable: true,
              value_area: 1500,
            },
          },
          line_linked: {
            enable: true,
            opacity: 0.3,
            color: "rgb(204, 212, 124)",
          },
          move: {
            direction: "random",
            speed: 0.3,
          },
          size: {
            value: 3,
          },
          opacity: {
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.05,
            },
          },
        },
        interactivity: {
          events: {
            onclick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            push: {
              particles_nb: 1,
            },
          },
        },
        retina_detect: true,
      },
    ])
  );

  const setParticles = () => {
    // RANDOM PARTICLE PARAMS
    setChosenParam(
      useGetRandomItem([
        //Simple
        {
          particles: {
            number: {
              value: 50,
            },
            size: {
              value: 3,
            },
            line_linked: {
              color: "rgb(204, 212, 124)",
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
            },
          },
        },
        //Bubbles
        {
          particles: {
            number: {
              value: 20,
              density: {
                enable: false,
              },
            },
            size: {
              value: 50,
              random: true,
              anim: {
                speed: 2,
                size_min: 0.3,
              },
              color: "rgb(204, 212, 124)",
            },
            line_linked: {
              enable: false,
            },
            move: {
              random: true,
              speed: 0.5,
              direction: "top",
              out_mode: "out",
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "bubble",
              },
              onclick: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              bubble: {
                distance: 300,
                duration: 4,
                size: 0,
                opacity: 0,
              },
              repulse: {
                distance: 600,
                duration: 8,
              },
            },
          },
        },
        //Night Sky
        {
          particles: {
            number: {
              value: 50,
              density: {
                enable: true,
                value_area: 1500,
              },
            },
            line_linked: {
              enable: true,
              opacity: 0.3,
              color: "rgb(204, 212, 124)",
            },
            move: {
              direction: "random",
              speed: 0.3,
            },
            size: {
              value: 3,
            },
            opacity: {
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.05,
              },
            },
          },
          interactivity: {
            events: {
              onclick: {
                enable: true,
                mode: "push",
              },
            },
            modes: {
              push: {
                particles_nb: 1,
              },
            },
          },
          retina_detect: true,
        },
      ])
    );
  };

  useEffect(() => {
    setParticles();
  }, []);

  return { chosenParam };
};

export default ParticlesConfig;
