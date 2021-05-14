import { useState, useEffect } from "react";

const ParticlesConfig = () => {
  const [screenSize, setScreenSize] = useState({ w: Number, h: Number });
  const [bubblesNumber, setBubblesNumber] = useState(Number);
  const [simpleNumber, setSimpleNumber] = useState(Number);

  const screenResize = () => {
    setScreenSize({ w: window.innerWidth, h: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", screenResize);

    return () => {
      window.removeEventListener("resize", screenResize);
    };
  }, []);

  useEffect(() => {
    if (screenSize.w >= 800) {
      setBubblesNumber(60);
      setSimpleNumber(80);
    } else {
      setBubblesNumber(30);
      setSimpleNumber(30);
    }
  }, [screenSize]);

  const simple = {
    particles: {
      number: {
        value: simpleNumber,
      },
      size: {
        value: 3,
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
  };

  const bubbles = {
    particles: {
      number: {
        value: bubblesNumber,
        density: {
          enable: false,
        },
      },
      size: {
        value: 10,
        random: true,
        anim: {
          speed: 4,
          size_min: 0.3,
        },
      },
      line_linked: {
        enable: false,
      },
      move: {
        random: true,
        speed: 1,
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
          distance: 400,
          duration: 4,
        },
      },
    },
  };

  return { simple, bubbles };
};

export default ParticlesConfig;
